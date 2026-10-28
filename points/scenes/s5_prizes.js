/* s5 — «جوائز شهر نوفمبر: نقاطك بتجيب لك هذي» — مكنسة روبوت 3D تدخل + كوبونات تنفرد */
MOTION.scene({
  id: 's5', start: 14.5, end: 18.5,
  setup(ctx) {
    const { THREE } = ctx;
    const st = this.st = ctx.stage3D({ fov: 30, camera: [0, 3.2, 13], lookAt: [0, 0, 0], tone: 'neutral', env: 'room' });
    const key = new THREE.DirectionalLight(0xffffff, 1.6); key.position.set(3, 8, 6); st.scene.add(key);
    st.scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const white = new THREE.MeshStandardMaterial({ color: '#F4F6FB', roughness: 0.35, envMapIntensity: 0.6 });
    const blue = new THREE.MeshStandardMaterial({ color: J.BLUE, roughness: 0.4, envMapIntensity: 0.5 });
    const red = new THREE.MeshStandardMaterial({ color: J.RED, roughness: 0.4 });
    const g = this.robot = new THREE.Group();
    const base = new THREE.Mesh(new THREE.CylinderGeometry(1.55, 1.55, 0.18, 96), blue); base.position.y = -0.2;
    const body = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.5, 0.42, 96), white);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.15, 0.025, 8, 96), blue); ring.rotation.x = Math.PI / 2; ring.position.y = 0.215;
    const tower = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.45, 0.22, 64), blue); tower.position.set(0, 0.3, -0.35);
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.05, 64), new THREE.MeshStandardMaterial({ color: '#5B8BEA', roughness: 0.3 })); cap.position.set(0, 0.43, -0.35);
    const dot = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.04, 32), red); dot.position.set(0, 0.22, 0.55);
    g.add(base, body, ring, tower, cap, dot); st.add(g);
  },
  draw(t, lt, ctx) {
    const { X, at } = ctx;
    X.fillStyle = J.BLUE; X.fillRect(0, 0, ctx.W, ctx.H);

    J.rise(ctx, X, 'جوائز شهر نوفمبر', 960, 250, { size: 64, family: 'body', weight: 700 }, lt, 0.05, 0.06);
    J.rise(ctx, X, 'نقاطك بتجيب لك', 960, 380, { size: 110 }, lt, 0.2, 0.08);
    J.rise(ctx, X, 'هذي', 960, 505, { size: 110 }, lt, 0.5);
    J.stroke(ctx, X, [[975, 540], [890, 534], [800, 546], [740, 540]], at(lt, 0.7, 0.95, 'cubicOut'), 11);

    // المكنسة: تدخل من اليمين وهي تلف، ترسم مسارها المنقّط
    const kin = at(lt, 0.35, 1.25, 'expoOut');
    const pk = at(lt, 0.35, 1.2, 'cubicOut');
    if (pk > 0) {
      X.save(); X.strokeStyle = 'rgba(255,255,255,0.55)'; X.lineWidth = 6; X.setLineDash([14, 14]); X.lineDashOffset = -lt * 60;
      X.beginPath(); X.ellipse(540, 690, 330, 100, 0, Math.PI * (1 - pk), Math.PI); X.stroke(); X.restore();
    }
    const r = this.robot, spin = Math.sin(lt * 1.8) * 0.25;
    r.position.set((1 - kin) * 6, 1.05 + Math.abs(Math.sin(lt * 3)) * 0.02, 0);
    r.rotation.set(0.05, (1 - kin) * 4 + spin, 0);
    r.scale.setScalar(0.72 + 0.04 * kin);
    this.st.draw(X);
    // نجوم لمعة
    for (const [x, y, d] of [[290, 640, 0.0], [790, 600, 0.15]]) {
      const k = at(lt, 1.2 + d, 1.45 + d, 'expoOut'); if (k <= 0) continue;
      const s = (26 + 6 * Math.sin(lt * 6 + d * 9)) * k; X.fillStyle = '#fff'; X.beginPath();
      X.moveTo(x, y - s); X.quadraticCurveTo(x, y, x + s, y); X.quadraticCurveTo(x, y, x, y + s); X.quadraticCurveTo(x, y, x - s, y); X.quadraticCurveTo(x, y, x, y - s); X.fill();
    }

    J.rise(ctx, X, 'مكنسة روبوت', 540, 1000, { size: 104, align: 'center' }, lt, 1.2, 0.08);
    const kpl = at(lt, 1.55, 1.8, 'expoOut');
    if (kpl > 0) ctx.text(X, '+', 540, 1105, { family: 'num', weight: 900, size: 110, color: '#fff', alpha: kpl });

    // الكوبونات: ثلاث تنفرد مثل المروحة
    const kc = at(lt, 1.75, 2.25, 'expoOut');
    if (kc > 0) {
      for (let i = 2; i >= 0; i--) {
        X.save(); X.translate(540, 1240 + (1 - kc) * 120); X.rotate((-0.06 + i * 0.05) * kc - 0.02); X.translate(i * 18 * kc, -i * 14 * kc); X.globalAlpha = kc;
        J.coupon(ctx, X, i === 0);
        X.restore();
      }
      const kb = at(lt, 2.25, 2.5, 'expoOut');
      if (kb > 0) {
        X.save(); X.translate(745, 1150); X.scale(0.92 + 0.08 * kb, 0.92 + 0.08 * kb); X.globalAlpha = kb;
        X.fillStyle = '#fff'; X.beginPath(); X.arc(0, 0, 62, 0, 6.2832); X.fill();
        X.fillStyle = J.RED; X.beginPath(); X.arc(0, 0, 54, 0, 6.2832); X.fill();
        ctx.text(X, '10×', 0, 18, { family: 'num', weight: 900, size: 48, color: '#fff', dir: 'ltr' });
        X.restore();
      }
    }
    J.rise(ctx, X, '10 كوبونات بقيمة 5 دينار', 540, 1440, { size: 76, align: 'center' }, lt, 2.4, 0.06);
  },
});

/* كوبون جامبو 5 دينار — مرسوم على شكل التصميم */
J.coupon = function (ctx, X, front) {
  const w = 300, h = 150;
  X.fillStyle = J.DARK; X.globalAlpha *= 1; X.beginPath(); X.roundRect(-w / 2 + 8, -h / 2 + 10, w, h, 16); X.fill();
  X.fillStyle = '#fff'; X.beginPath(); X.roundRect(-w / 2, -h / 2, w, h, 16); X.fill();
  X.fillStyle = J.BLUE; X.beginPath(); X.arc(-w / 2, 0, 18, -Math.PI / 2, Math.PI / 2); X.arc(w / 2, 0, 18, Math.PI / 2, Math.PI * 1.5); X.fill();
  if (!front) return;
  X.strokeStyle = J.BLUE; X.lineWidth = 3; X.setLineDash([8, 7]); X.beginPath(); X.moveTo(-60, -h / 2 + 12); X.lineTo(-60, h / 2 - 12); X.stroke(); X.setLineDash([]);
  X.fillStyle = J.BLUE; X.beginPath(); X.arc(-100, -14, 30, 0, 6.2832); X.fill();
  X.drawImage(ctx.img('emblem'), -122, -36, 44, 44);
  ctx.text(X, 'كوبون', -100, 46, { family: 'body', weight: 700, size: 24, color: J.BLUE });
  ctx.text(X, '5', 100, 30, { family: 'num', weight: 900, size: 96, color: J.BLUE, dir: 'ltr' });
  ctx.text(X, 'دينار', 20, 22, { family: 'display', weight: 900, size: 40, color: J.BLUE });
};
