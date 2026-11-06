/* Deluxe Kamin — 3D kamin səhnəsi (Three.js r128)
   Real görünüş: otaq işığından əks olunmalar, şamot daxili divar, qabıqlı odunlar,
   shader ilə çəkilmiş alov. Scroll ilə: kamin fırlanır, şüşə açılır, baca qatlara bölünür. */
(function () {
  'use strict';

  DK.hero3d = function (canvas) {
    if (!window.THREE) return null;
    var test = document.createElement('canvas');
    if (!(test.getContext('webgl') || test.getContext('experimental-webgl'))) return null;

    var T = THREE;
    var mobile = window.innerWidth < 760;
    var renderer = new T.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2));
    renderer.outputEncoding = T.sRGBEncoding;
    renderer.toneMapping = T.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = T.PCFSoftShadowMap;

    var scene = new T.Scene();
    var camera = new T.PerspectiveCamera(28, 1, 0.1, 100);

    /* ---------- Otaq işığı (əks olunmalar üçün mühit xəritəsi) ---------- */
    var pmrem = new T.PMREMGenerator(renderer);
    var envScene = new T.Scene();
    envScene.add(new T.Mesh(new T.BoxGeometry(24, 12, 24), new T.MeshBasicMaterial({ color: 0x5a5550, side: T.BackSide })));
    function softbox(w, h, x, y, z, c, k) {
      var m = new T.Mesh(new T.PlaneGeometry(w, h), new T.MeshBasicMaterial({ color: new T.Color(c).multiplyScalar(k), side: T.DoubleSide }));
      m.position.set(x, y, z); m.lookAt(0, 0, 0); envScene.add(m);
    }
    softbox(10, 4, 0, 5.8, 2, 0xffffff, 4);        // tavan işığı
    softbox(4, 6, -9, 1.5, 4, 0xfff4e8, 3);        // sol pəncərə
    softbox(3, 5, 9, 1, -3, 0xdfe8ff, 1.6);        // sağ arxa
    var floorEnv = new T.Mesh(new T.PlaneGeometry(24, 24), new T.MeshBasicMaterial({ color: 0x2a2624 }));
    floorEnv.rotation.x = -Math.PI / 2; floorEnv.position.y = -5.9; envScene.add(floorEnv);
    scene.environment = pmrem.fromScene(envScene, 0.035).texture;
    pmrem.dispose();

    /* ---------- Teksturalar (kodla) ---------- */
    function canvasTex(w, h, draw, srgb) {
      var c = document.createElement('canvas'); c.width = w; c.height = h;
      draw(c.getContext('2d'), w, h);
      var t = new T.CanvasTexture(c); if (srgb !== false) t.encoding = T.sRGBEncoding; t.anisotropy = 8;
      return t;
    }
    function rnd(a, b) { return a + Math.random() * (b - a); }
    function speckle(g, w, h, n, alpha) {
      for (var i = 0; i < n; i++) {
        var l = Math.random() < 0.5 ? 0 : 255;
        g.fillStyle = 'rgba(' + l + ',' + l + ',' + l + ',' + (Math.random() * alpha) + ')';
        g.fillRect(Math.random() * w, Math.random() * h, rnd(1, 3), rnd(1, 3));
      }
    }
    // şamot (odadavamlı) daxili plitələr, yuxarısı hisli
    function chamotte(cols, rows) {
      return canvasTex(1024, 512, function (g, w, h) {
        g.fillStyle = '#231a16'; g.fillRect(0, 0, w, h);
        var bw = w / cols, bh = h / rows;
        for (var r = 0; r < rows; r++) for (var c = 0; c < cols; c++) {
          var l = rnd(22, 27);
          g.fillStyle = 'hsl(' + rnd(18, 24) + ',' + rnd(16, 22) + '%,' + l + '%)';
          g.fillRect(c * bw + 1.5, r * bh + 1.5, bw - 3, bh - 3);
        }
        speckle(g, w, h, 9000, 0.12);
        var s = g.createLinearGradient(0, 0, 0, h);                // his
        s.addColorStop(0, 'rgba(6,5,4,.96)'); s.addColorStop(0.55, 'rgba(8,6,5,.55)'); s.addColorStop(1, 'rgba(10,8,6,0)');
        g.fillStyle = s; g.fillRect(0, 0, w, h);
        var m = g.createRadialGradient(w / 2, h * 0.3, 10, w / 2, h * 0.3, w * 0.45);
        m.addColorStop(0, 'rgba(0,0,0,.45)'); m.addColorStop(1, 'rgba(0,0,0,0)');
        g.fillStyle = m; g.fillRect(0, 0, w, h);
      });
    }
    var backTex = chamotte(3, 2), sideTex = chamotte(1, 2);
    var floorTex = canvasTex(512, 256, function (g, w, h) {    // kül və köz
      g.fillStyle = '#2b2522'; g.fillRect(0, 0, w, h);
      speckle(g, w, h, 6000, 0.25);
      for (var i = 0; i < 260; i++) {
        g.fillStyle = 'rgba(' + (30 + Math.random() * 30 | 0) + ',20,16,' + rnd(0.4, 0.9) + ')';
        g.beginPath(); g.arc(Math.random() * w, Math.random() * h, rnd(2, 9), 0, 7); g.fill();
      }
    });
    var emberTex = canvasTex(512, 256, function (g, w, h) {
      g.fillStyle = '#000'; g.fillRect(0, 0, w, h);
      for (var i = 0; i < 420; i++) {
        var x = w * (0.08 + 0.84 * Math.random()), y = h * (0.15 + 0.7 * Math.random()), r = rnd(2, 10);
        var gr = g.createRadialGradient(x, y, 0, x, y, r);
        gr.addColorStop(0, 'rgba(255,' + (120 + Math.random() * 90 | 0) + ',40,' + rnd(0.5, 1) + ')'); gr.addColorStop(1, 'rgba(255,60,0,0)');
        g.fillStyle = gr; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill();
      }
    });
    // odun qabığı: u — dairə boyu, v — uzunluq boyu
    var barkTex = canvasTex(512, 512, function (g, w, h) {
      g.fillStyle = '#2a1c13'; g.fillRect(0, 0, w, h);
      for (var i = 0; i < 520; i++) {
        var x = Math.random() * w, y = Math.random() * h, len = rnd(30, 180);
        g.strokeStyle = Math.random() < 0.55 ? 'rgba(10,6,4,' + rnd(0.4, 0.9) + ')' : 'rgba(' + (70 + Math.random() * 40 | 0) + ',52,38,' + rnd(0.25, 0.6) + ')';
        g.lineWidth = rnd(1, 4);
        g.beginPath(); g.moveTo(x, y); g.bezierCurveTo(x + rnd(-6, 6), y + len / 3, x + rnd(-6, 6), y + len * 0.66, x + rnd(-4, 4), y + len); g.stroke();
      }
      var c = g.createLinearGradient(0, 0, w, 0);
      c.addColorStop(0, 'rgba(5,4,3,.85)'); c.addColorStop(0.35, 'rgba(5,4,3,0)'); c.addColorStop(0.65, 'rgba(5,4,3,0)'); c.addColorStop(1, 'rgba(5,4,3,.85)');
      g.fillStyle = c; g.fillRect(0, 0, w, h);
    });
    var crackTex = canvasTex(512, 512, function (g, w, h) {    // közərən çatlar
      g.fillStyle = '#000'; g.fillRect(0, 0, w, h);
      g.lineCap = 'round';
      for (var i = 0; i < 55; i++) {
        var side = Math.random() < 0.7;                          // çoxu altda (u kənarlarında)
        var x = side ? (Math.random() < 0.5 ? rnd(0, w * 0.3) : rnd(w * 0.7, w)) : Math.random() * w;
        var y = Math.random() * h;
        g.strokeStyle = 'rgba(255,' + (90 + Math.random() * 100 | 0) + ',30,' + rnd(0.5, 1) + ')';
        g.lineWidth = rnd(0.8, 2);
        g.beginPath(); g.moveTo(x, y);
        for (var k = 0; k < 3; k++) { x += rnd(-30, 30); y += rnd(-14, 14); g.lineTo(x, y); }
        g.stroke();
      }
    });
    var sparkTex = canvasTex(64, 64, function (g, w) {
      var r = g.createRadialGradient(w / 2, w / 2, 0, w / 2, w / 2, w / 2);
      r.addColorStop(0, 'rgba(255,255,255,1)'); r.addColorStop(0.3, 'rgba(255,255,255,.6)'); r.addColorStop(1, 'rgba(255,255,255,0)');
      g.fillStyle = r; g.fillRect(0, 0, w, w);
    });
    var shadowTex = canvasTex(256, 256, function (g, w) {
      var r = g.createRadialGradient(w / 2, w / 2, 0, w / 2, w / 2, w / 2);
      r.addColorStop(0, 'rgba(0,0,0,.6)'); r.addColorStop(1, 'rgba(0,0,0,0)');
      g.fillStyle = r; g.fillRect(0, 0, w, w);
    });
    var stoneTex = canvasTex(512, 256, function (g, w, h) {    // tünd daş altlıq
      g.fillStyle = '#26221f'; g.fillRect(0, 0, w, h);
      speckle(g, w, h, 14000, 0.18);
      g.strokeStyle = 'rgba(255,255,255,.05)'; g.lineWidth = 1;
      for (var i = 0; i < 18; i++) { g.beginPath(); var x = Math.random() * w; g.moveTo(x, 0); g.bezierCurveTo(x + rnd(-80, 80), h / 3, x + rnd(-80, 80), h * 0.66, x + rnd(-60, 60), h); g.stroke(); }
    });

    /* ---------- Materiallar ---------- */
    var steel = new T.MeshStandardMaterial({ color: 0x141416, metalness: 0.45, roughness: 0.48, envMapIntensity: 0.9 });
    var satin = new T.MeshStandardMaterial({ color: 0x0c0c0d, metalness: 0.9, roughness: 0.26, envMapIntensity: 1.2 });
    var printMat = new T.MeshStandardMaterial({ color: 0x050505, metalness: 0, roughness: 0.15, envMapIntensity: 1.1 });
    var baffle = new T.MeshStandardMaterial({ color: 0x0a0909, metalness: 0.6, roughness: 0.7 });
    var stone = new T.MeshStandardMaterial({ map: stoneTex, roughness: 0.32, metalness: 0, envMapIntensity: 0.8 });
    var chamBack = new T.MeshStandardMaterial({ map: backTex, roughness: 0.95, envMapIntensity: 0.25, emissive: 0xff5a1e, emissiveMap: backTex, emissiveIntensity: 0.2 });
    var chamSide = new T.MeshStandardMaterial({ map: sideTex, roughness: 0.95, envMapIntensity: 0.25, emissive: 0xff5a1e, emissiveMap: sideTex, emissiveIntensity: 0.2 });
    var ash = new T.MeshStandardMaterial({ map: floorTex, roughness: 1, envMapIntensity: 0.2, emissive: 0xff6a20, emissiveMap: emberTex, emissiveIntensity: 1 });
    var wood = new T.MeshStandardMaterial({ map: barkTex, bumpMap: barkTex, bumpScale: 0.006, roughness: 0.95, envMapIntensity: 0.25, emissive: 0xff5212, emissiveMap: crackTex, emissiveIntensity: 0.6 });
    var woodEnd = new T.MeshStandardMaterial({ color: 0x120c08, roughness: 1, emissive: 0xff4a10, emissiveMap: crackTex, emissiveIntensity: 0.7 });
    var coal = new T.MeshStandardMaterial({ color: 0x1a1210, roughness: 0.9, flatShading: true, emissive: 0xff4a12, emissiveIntensity: 0.6 });
    var glassMat = new T.MeshPhysicalMaterial({ color: 0xffffff, metalness: 0, roughness: 0.03, transparent: true, opacity: 0.12, envMapIntensity: 2.6, clearcoat: 1, clearcoatRoughness: 0.03, depthWrite: false, side: T.DoubleSide });
    var ceramicOuter = new T.MeshStandardMaterial({ color: 0x8f8a84, roughness: 0.9, transparent: true, opacity: 1, side: T.DoubleSide, envMapIntensity: 0.6 });
    var insulation = new T.MeshStandardMaterial({ color: 0xe0cf8e, roughness: 1, transparent: true, opacity: 1, side: T.DoubleSide, envMapIntensity: 0.5 });
    var liner = new T.MeshStandardMaterial({ color: 0xc8c8c8, roughness: 0.22, metalness: 1, envMapIntensity: 1.2 });

    function shadowed(m) { m.castShadow = true; m.receiveShadow = true; return m; }
    function box(w, h, d, m, x, y, z) {
      var mesh = shadowed(new T.Mesh(new T.BoxGeometry(w, h, d), m));
      mesh.position.set(x, y, z);
      return mesh;
    }
    function rrect(w, h, r, path) {
      var s = path ? new T.Path() : new T.Shape(), x = -w / 2, y = -h / 2;
      s.moveTo(x + r, y); s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r);
      s.lineTo(x + w, y + h - r); s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      s.lineTo(x + r, y + h); s.quadraticCurveTo(x, y + h, x, y + h - r);
      s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y);
      return s;
    }
    function frameGeo(ow, oh, or, iw, ih, ir, depth, bevel) {
      var s = rrect(ow, oh, or); s.holes.push(rrect(iw, ih, ir, true));
      return new T.ExtrudeGeometry(s, { depth: depth, bevelEnabled: bevel > 0, bevelThickness: bevel, bevelSize: bevel, bevelSegments: 4, curveSegments: 10 });
    }

    /* ---------- Kamin ---------- */
    var product = new T.Group();
    scene.add(product);
    var body = new T.Group();
    product.add(body);

    // korpus: yumru kənarlı qabıq + arxa lövhə
    var shell = shadowed(new T.Mesh(frameGeo(2.0, 1.2, 0.05, 1.8, 0.9, 0.012, 0.72, 0.012), steel));
    shell.position.set(0, 0.6, -0.37); body.add(shell);
    body.add(box(1.96, 1.16, 0.04, steel, 0, 0.6, -0.37));
    // ön satin çərçivə
    var bezel = shadowed(new T.Mesh(frameGeo(2.06, 1.26, 0.06, 1.82, 0.92, 0.014, 0.02, 0.008), satin));
    bezel.position.set(0, 0.6, 0.355); body.add(bezel);

    // yanma kamerası: şamot divarlar, deflektor, kül yatağı
    var back = new T.Mesh(new T.PlaneGeometry(1.8, 0.9), chamBack); back.position.set(0, 0.6, -0.33); back.receiveShadow = true; body.add(back);
    var sideL = new T.Mesh(new T.PlaneGeometry(0.68, 0.9), chamSide); sideL.rotation.y = Math.PI / 2 - 0.12; sideL.position.set(-0.86, 0.6, 0.0); sideL.receiveShadow = true; body.add(sideL);
    var sideR = new T.Mesh(new T.PlaneGeometry(0.68, 0.9), chamSide); sideR.rotation.y = -Math.PI / 2 + 0.12; sideR.position.set(0.86, 0.6, 0.0); sideR.receiveShadow = true; body.add(sideR);
    body.add(box(1.72, 0.018, 0.42, baffle, 0, 0.99, -0.1));
    var bed = new T.Mesh(new T.PlaneGeometry(1.72, 0.66), ash); bed.rotation.x = -Math.PI / 2; bed.position.set(0, 0.152, 0.0); bed.receiveShadow = true; body.add(bed);

    // odunlar: nizamsız səth, qabıq, közərən çatlar
    function logGeo(r, len, s) {
      var g = new T.CylinderGeometry(r * 0.94, r, len, 22, 14, false);
      var p = g.attributes.position;
      for (var i = 0; i < p.count; i++) {
        var x = p.getX(i), y = p.getY(i), z = p.getZ(i), a = Math.atan2(z, x);
        var k = 1 + 0.07 * Math.sin(a * 5 + y * 9 + s) + 0.04 * Math.sin(a * 13 - y * 17 + s * 2) + 0.03 * Math.sin(y * 31 + s);
        p.setX(i, x * k); p.setZ(i, z * k);
      }
      g.computeVertexNormals();
      return g;
    }
    var logs = [
      [-0.06, 0.205, 0.08, 0.14, 0.058, 1.12],
      [0.08, 0.205, -0.12, -0.1, 0.062, 1.08],
      [0.02, 0.31, -0.02, 0.42, 0.05, 0.98],
      [-0.32, 0.27, -0.04, -0.85, 0.042, 0.62]
    ];
    logs.forEach(function (l, i) {
      var log = new T.Mesh(logGeo(l[4], l[5], i * 1.7), [wood, woodEnd, woodEnd]);
      log.rotation.order = 'YXZ';
      log.rotation.z = Math.PI / 2; log.rotation.y = l[3]; log.rotation.x = (i % 2 ? 0.05 : -0.04);
      log.position.set(l[0], l[1], l[2]);
      log.castShadow = true; log.receiveShadow = true;
      body.add(log);
    });
    // köz parçaları
    var coalGeo = new T.DodecahedronGeometry(1, 0);
    for (var ci = 0; ci < (mobile ? 22 : 40); ci++) {
      var cm = new T.Mesh(coalGeo, coal);
      var cs = rnd(0.015, 0.034);
      cm.scale.set(cs * rnd(0.8, 1.4), cs * rnd(0.5, 0.9), cs * rnd(0.8, 1.3));
      cm.rotation.set(rnd(0, 3), rnd(0, 3), rnd(0, 3));
      cm.position.set(rnd(-0.68, 0.68), 0.16, rnd(-0.22, 0.2));
      body.add(cm);
    }

    // şüşə: çərçivəsiz, kənarı qara çap
    var glass = new T.Group();
    var pane = new T.Mesh(new T.BoxGeometry(1.84, 0.94, 0.01), glassMat);
    pane.renderOrder = 10;
    glass.add(pane);
    var print = new T.Mesh(frameGeo(1.84, 0.94, 0.014, 1.74, 0.86, 0.01, 0.004, 0), printMat);
    print.position.z = -0.008; glass.add(print);
    glass.position.set(0, 0.6, 0.385);
    body.add(glass);
    var glassBase = glass.position.clone();

    // alov: fbm səs-küylü shader, bir neçə qat
    var FLAME_V = 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }';
    var FLAME_F = [
      'uniform float uTime; uniform float uI; uniform float uSeed; varying vec2 vUv;',
      'float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }',
      'float noise(vec2 p){ vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);',
      '  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y); }',
      'float fbm(vec2 p){ float v = 0.0, a = 0.5; for (int i = 0; i < 5; i++){ v += a * noise(p); p = p * 2.03 + 1.7; a *= 0.5; } return v; }',
      'void main(){',
      '  vec2 uv = vUv; float t = uTime;',
      '  float n1 = fbm(vec2(uv.x * 3.2 + uSeed, uv.y * 2.3 - t * 1.7));',
      '  float n2 = fbm(vec2(uv.x * 7.0 - uSeed * 2.0, uv.y * 4.5 - t * 3.2));',
      '  float x = uv.x + (n1 - 0.5) * 0.32 * uv.y;',
      '  float tongues = 0.5 + 0.5 * sin(x * 6.2831 * 2.4 + uSeed * 3.0 + n1 * 2.5);',
      '  float h = uv.y / (0.22 + 0.78 * uI * (0.3 + 0.7 * tongues));',
      '  float edge = smoothstep(0.02, 0.2, x) * smoothstep(0.98, 0.8, x);',
      '  float b = (1.0 - h) * edge + (n2 - 0.5) * 0.6 - h * 0.2;',
      '  float a = smoothstep(0.06, 0.5, b);',
      '  float core = smoothstep(0.42, 0.95, b);',
      '  vec3 col = mix(vec3(0.55, 0.07, 0.01), vec3(1.0, 0.42, 0.07), smoothstep(0.08, 0.45, b));',
      '  col = mix(col, vec3(1.0, 0.86, 0.55), core);',
      '  col += vec3(0.02, 0.06, 0.3) * smoothstep(0.07, 0.0, uv.y) * edge * 0.8;',
      '  float base = smoothstep(0.0, 0.05, uv.y);',
      '  gl_FragColor = vec4(col * a * base * uI * 1.45, 1.0);',
      '}'
    ].join('\n');
    var flames = [];
    function flame(w, h, x, z, ry, seed) {
      var m = new T.ShaderMaterial({
        uniforms: { uTime: { value: 0 }, uI: { value: 1 }, uSeed: { value: seed } },
        vertexShader: FLAME_V, fragmentShader: FLAME_F,
        transparent: true, depthWrite: false, blending: T.AdditiveBlending, side: T.DoubleSide
      });
      var f = new T.Mesh(new T.PlaneGeometry(w, h), m);
      f.position.set(x, 0.17 + h / 2, z); f.userData.ry = ry; f.renderOrder = 5;
      body.add(f); flames.push(f);
    }
    flame(1.45, 0.8, 0, -0.14, 0, 1.3);
    flame(1.3, 0.72, 0.02, -0.02, 0, 4.1);
    flame(1.15, 0.62, -0.04, 0.09, 0, 7.7);
    flame(0.7, 0.6, -0.3, -0.05, 0.7, 2.6);
    flame(0.7, 0.6, 0.32, -0.04, -0.7, 9.2);

    // daxili parıltı (yumşaq "bloom" əvəzi)
    var glow = new T.Sprite(new T.SpriteMaterial({ map: sparkTex, color: 0xff6a1e, transparent: true, opacity: 0.35, depthWrite: false, blending: T.AdditiveBlending }));
    glow.scale.set(1.9, 0.9, 1); glow.position.set(0, 0.42, -0.1); glow.renderOrder = 4;
    body.add(glow);

    // qığılcımlar
    var SN = mobile ? 40 : 70;
    var sgeo = new T.BufferGeometry();
    var spos = new Float32Array(SN * 3), slife = new Float32Array(SN), sspd = new Float32Array(SN), sseed = new Float32Array(SN), scol = new Float32Array(SN * 3);
    function resetS(i, rl) {
      spos[i * 3] = rnd(-0.55, 0.55); spos[i * 3 + 1] = rnd(0.2, 0.35); spos[i * 3 + 2] = rnd(-0.2, 0.15);
      slife[i] = rl ? Math.random() : 0; sspd[i] = rnd(0.2, 0.6); sseed[i] = Math.random() * 10;
    }
    for (var si = 0; si < SN; si++) resetS(si, true);
    sgeo.setAttribute('position', new T.BufferAttribute(spos, 3));
    sgeo.setAttribute('color', new T.BufferAttribute(scol, 3));
    var sparks = new T.Points(sgeo, new T.PointsMaterial({ size: 0.028, map: sparkTex, vertexColors: true, transparent: true, depthWrite: false, blending: T.AdditiveBlending }));
    body.add(sparks);

    var fireLight = new T.PointLight(0xff7a2e, 0, 3.2, 2);
    fireLight.position.set(0, 0.45, 0.05);
    body.add(fireLight);
    var spill = new T.PointLight(0xff8a3c, 0, 3.5, 2);           // önə, altlığa düşən işıq
    spill.position.set(0, 0.35, 0.95);
    body.add(spill);

    // daş altlıq
    body.add(box(2.5, 0.035, 0.62, stone, 0, 0.0175, 0.71));

    /* ---------- Baca (3 qat) ---------- */
    var flue = new T.Group();
    flue.position.set(0, 1.2, -0.05);
    product.add(flue);
    function cyl(r, h, m, y) {
      var c = shadowed(new T.Mesh(new T.CylinderGeometry(r, r, h, 64, 1, true), m));
      c.position.y = y;
      return c;
    }
    var H = 1.9;
    var lOuter = cyl(0.27, H, ceramicOuter, H / 2);
    var lIns = cyl(0.215, H, insulation, H / 2);
    var lLiner = cyl(0.15, H, liner, H / 2);
    var cap = box(0.66, 0.06, 0.66, satin, 0, H + 0.03, 0);
    flue.add(lOuter, lIns, lLiner, cap);

    /* ---------- Döşəmə kölgəsi ---------- */
    var shadowPlane = new T.Mesh(new T.PlaneGeometry(12, 12), new T.ShadowMaterial({ opacity: 0.22 }));
    shadowPlane.rotation.x = -Math.PI / 2; shadowPlane.receiveShadow = true; scene.add(shadowPlane);
    var blob = new T.Mesh(new T.PlaneGeometry(4.4, 2.4), new T.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false }));
    blob.rotation.x = -Math.PI / 2; blob.position.y = 0.002; scene.add(blob);

    /* ---------- İşıqlar ---------- */
    var hemi = new T.HemisphereLight(0xffffff, 0x2a2420, 0.35); scene.add(hemi);
    var key = new T.DirectionalLight(0xfff6ee, 1.3);
    key.position.set(-1.4, 7, 3); key.castShadow = true;
    key.shadow.mapSize.set(mobile ? 1024 : 2048, mobile ? 1024 : 2048);
    key.shadow.camera.left = -4; key.shadow.camera.right = 4; key.shadow.camera.top = 5; key.shadow.camera.bottom = -2;
    key.shadow.radius = 7; key.shadow.bias = -0.0004; key.shadow.normalBias = 0.02;
    scene.add(key);
    var rim = new T.DirectionalLight(0xdfe6ff, 0.8); rim.position.set(4, 3, -4); scene.add(rim);

    var dark = false;
    function applyTheme() {
      dark = document.documentElement.dataset.theme === 'dark';
      shadowPlane.material.opacity = dark ? 0.4 : 0.16;
      blob.material.opacity = dark ? 0.95 : 0.6;
      hemi.intensity = dark ? 0.18 : 0.35;
      key.intensity = dark ? 0.8 : 1.3;
      rim.intensity = dark ? 1.4 : 0.7;
      steel.envMapIntensity = dark ? 0.55 : 0.9;
      satin.envMapIntensity = dark ? 0.9 : 1.2;
      glassMat.envMapIntensity = dark ? 1.8 : 2.6;
      steel.color.set(dark ? 0x1d1d20 : 0x141416);
    }
    applyTheme();
    new MutationObserver(applyTheme).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    
    /* ---------- Vəziyyət (scroll-dan gəlir) ---------- */
    var state = { p: 0 };
    var cur = { rot: 0, fire: 0.82, glass: 0, flue: 0, rise: 0, camY: 1.95, look: 1.7, dist: 8.8, sx: 0, sy: 0, zoom: 1 };
    var frameT = { sx: 0, sy: 0, zoom: 1 };
    var mouse = { x: 0, y: 0 };
    window.addEventListener('pointermove', function (e) { mouse.x = e.clientX / window.innerWidth - 0.5; mouse.y = e.clientY / window.innerHeight - 0.5; });

    function seg(p, a, b) { return Math.min(1, Math.max(0, (p - a) / (b - a))); }
    function ease(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
    function targets(p) {
      var orbit = ease(seg(p, 0.08, 0.4)) - ease(seg(p, 0.86, 1)) * 0.6;
      var g = ease(seg(p, 0.3, 0.5)) * (1 - ease(seg(p, 0.84, 0.95)));
      var rise = ease(seg(p, 0.44, 0.56));
      var f = ease(seg(p, 0.56, 0.74)) * (1 - ease(seg(p, 0.84, 0.95)));
      var end = ease(seg(p, 0.84, 1));
      return {
        rot: -0.75 * orbit,
        fire: 0.82 + 0.18 * ease(seg(p, 0.02, 0.25)),
        glass: g,
        flue: f,
        rise: rise,
        camY: 1.95 + 0.6 * rise + 0.3 * end,
        look: 1.7 + 0.5 * rise + 0.6 * end,
        dist: 8.8 + 3.2 * rise + 1.0 * end
      };
    }

    var vw = 1, vh = 1;
    function resize() {
      var w = canvas.clientWidth, h = canvas.clientHeight;
      vw = w; vh = h;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.fov = w / h < 0.8 ? 40 : 28;
      camera.updateProjectionMatrix();
    }
    window.addEventListener('resize', resize);
    resize();

    var clock = new T.Clock(), running = true, raf;
    function frame() {
      if (!running) return;
      var dt = Math.min(clock.getDelta(), 0.05), t = clock.elapsedTime;
      var tg = targets(state.p);
      tg.sx = frameT.sx; tg.sy = frameT.sy; tg.zoom = frameT.zoom;
      for (var k in tg) cur[k] += (tg[k] - cur[k]) * Math.min(1, dt * 5);
      camera.setViewOffset(vw, vh, -cur.sx, -cur.sy, vw, vh);

      product.rotation.y = cur.rot + mouse.x * 0.12;
      glass.position.set(glassBase.x, glassBase.y + 0.32 * cur.glass, glassBase.z + 0.75 * cur.glass);
      glass.rotation.x = -0.18 * cur.glass;
      flue.scale.y = Math.max(0.001, cur.rise);
      flue.visible = cur.rise > 0.005;
      lOuter.position.y = H / 2 + 1.05 * cur.flue;
      lIns.position.y = H / 2 + 0.55 * cur.flue;
      lLiner.position.y = H / 2 + 0.12 * cur.flue;
      cap.position.y = H + 0.03 + 1.12 * cur.flue;
      ceramicOuter.opacity = 1 - 0.55 * cur.flue;
      insulation.opacity = 1 - 0.25 * cur.flue;

      var dist = cur.dist * cur.zoom * (camera.aspect < 0.8 ? 1.25 : 1);
      camera.position.set(Math.sin(mouse.x * 0.1) * 0.6, cur.camY - mouse.y * 0.25, dist);
      camera.lookAt(0, cur.look, 0);

      // alov və işıq titrəməsi
      var I = cur.fire;
      var flick = 0.82 + Math.sin(t * 11.3) * 0.06 + Math.sin(t * 6.7 + 1.3) * 0.07 + Math.sin(t * 23.1) * 0.03 + Math.random() * 0.04;
      for (var fi = 0; fi < flames.length; fi++) {
        var fl = flames[fi];
        fl.material.uniforms.uTime.value = t;
        fl.material.uniforms.uI.value = I * (0.92 + 0.08 * Math.sin(t * 3 + fi));
        fl.rotation.y = fl.userData.ry - product.rotation.y * 0.7;      // həcm hissi üçün kameraya dönür
      }
      fireLight.intensity = (dark ? 2.6 : 2.0) * I * flick;
      spill.intensity = (dark ? 1.1 : 0.6) * I * flick;
      glow.material.opacity = (dark ? 0.5 : 0.32) * I * flick;
      chamBack.emissiveIntensity = chamSide.emissiveIntensity = (0.1 + 0.35 * I) * flick;
      ash.emissiveIntensity = (0.5 + 1.1 * I) * (0.9 + 0.1 * Math.sin(t * 1.7));
      wood.emissiveIntensity = (0.25 + 0.55 * I) * (0.85 + 0.15 * Math.sin(t * 2.3 + 0.5));
      woodEnd.emissiveIntensity = 0.3 + 0.5 * I * flick;
      coal.emissiveIntensity = (0.3 + 0.8 * I) * (0.85 + 0.15 * Math.sin(t * 1.3));

      for (var i = 0; i < SN; i++) {
        slife[i] += dt * sspd[i] * 0.8;
        if (slife[i] >= 1) resetS(i, false);
        var L = slife[i], i3 = i * 3;
        spos[i3 + 1] += dt * sspd[i] * 1.1;
        spos[i3] += Math.sin(t * 4 + sseed[i]) * dt * 0.12;
        spos[i3 + 2] += Math.cos(t * 3 + sseed[i]) * dt * 0.04;
        if (spos[i3 + 1] > 0.95) resetS(i, false);
        var a = Math.sin(L * Math.PI) * I * (0.6 + 0.4 * Math.sin(t * 20 + sseed[i]));
        scol[i3] = a; scol[i3 + 1] = a * 0.55; scol[i3 + 2] = a * 0.15;
      }
      sgeo.attributes.position.needsUpdate = true;
      sgeo.attributes.color.needsUpdate = true;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(frame);
    }

    new IntersectionObserver(function (en) {
      var vis = en[0].isIntersecting;
      if (vis && !running) { running = true; clock.getDelta(); frame(); }
      if (!vis) { running = false; cancelAnimationFrame(raf); }
    }).observe(canvas);
    frame();

    return {
      setProgress: function (p) { state.p = p; },
      setFrame: function (f) { frameT.sx = f.sx; frameT.sy = f.sy; frameT.zoom = f.zoom; },
      snapFrame: function (f) { this.setFrame(f); cur.sx = f.sx; cur.sy = f.sy; cur.zoom = f.zoom; }
    };
  };
})();
