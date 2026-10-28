/* s1 — الهوك: «شنو ممكن الدينار ييب لك؟» + الورقة النقدية تطير بـ3D وتستقر */

/* أدوات مشتركة لكل المشاهد (هالملف ينقرا أول) */
window.J = {
  BLUE: '#0049C9', RED: '#EF3B2D', DARK: '#0A2E8A', WHITE: '#FFFFFF', PALE: '#C9D8F5',
  // كلمة كلمة تطلع من تحت قناع، بتتابع
  rise(ctx, X, str, x, y, o, lt, t0, stagger = 0.06, dur = 0.32) {
    const L = ctx.text.layout(X, str, { family: o.family || 'display', weight: o.weight || 900, size: o.size, maxWidth: o.maxWidth });
    return ctx.text.drawLayout(X, L, x, y, { align: o.align || 'right', color: o.color || '#fff', perWord: (i) => {
      const k = ctx.at(lt, t0 + i * stagger, t0 + i * stagger + dur, 'expoOut');
      return { clipUp: 1, dy: (1 - k) * o.size * 0.9, alpha: k > 0 ? (o.alpha ?? 1) : 0 };
    } });
  },
  // خط أحمر مرسوم باليد
  stroke(ctx, X, pts, k, w, color) {
    if (k <= 0) return;
    ctx.drawPath(X, pts, k, { width: w, color: color || J.RED, cap: 'round', smooth: true });
  },
  // ختم جامبو: دائرة بيضاء ← حمراء ← حلقة متقطعة ← الفيل
  stamp(ctx, X, x, y, r, o = {}) {
    X.save(); X.translate(x, y); X.rotate(o.rot || 0); X.scale(o.s ?? 1, o.s ?? 1);
    if (o.shadow !== false) { X.fillStyle = 'rgba(10,46,138,0.45)'; X.beginPath(); X.arc(6, 14, r, 0, 6.2832); X.fill(); }
    X.fillStyle = o.ring || '#fff'; X.beginPath(); X.arc(0, 0, r, 0, 6.2832); X.fill();
    X.fillStyle = o.fill || J.RED; X.beginPath(); X.arc(0, 0, r * 0.9, 0, 6.2832); X.fill();
    X.strokeStyle = '#fff'; X.lineWidth = r * 0.03; X.setLineDash([r * 0.075, r * 0.06]); X.lineDashOffset = -(o.spin || 0) * r;
    X.beginPath(); X.arc(0, 0, r * 0.76, 0, 6.2832); X.stroke(); X.setLineDash([]);
    const e = ctx.img('emblem'), er = r * 0.62; X.drawImage(e, -er, -er, er * 2, er * 2);
    X.restore();
  },
  // شريطة بيضاء بنص أزرق (مثل «= نقطة»)
  ribbon(ctx, X, x, y, w, h, str, o = {}) {
    X.save(); X.translate(x, y); X.rotate(o.rot ?? -0.12); X.scale(o.s ?? 1, o.s ?? 1);
    const t = h * 0.45;
    X.fillStyle = J.DARK; X.beginPath(); X.moveTo(-w / 2 - t, h * 0.62); X.lineTo(-w / 2 + 6, h * 0.62); X.lineTo(-w / 2 + 6, h * 0.1); X.closePath(); X.fill();
    X.fillStyle = '#fff'; X.beginPath();
    X.moveTo(-w / 2 - t, -h / 2); X.lineTo(w / 2 + t, -h / 2); X.lineTo(w / 2, 0); X.lineTo(w / 2 + t, h / 2); X.lineTo(-w / 2 - t, h / 2); X.lineTo(-w / 2, 0); X.closePath(); X.fill();
    ctx.text(X, str, 0, h * 0.2, { family: 'display', weight: 900, size: h * 0.62, color: o.color || J.BLUE });
    X.restore();
  },
  // ورقة الدينار بإطار أبيض كتكستشر
  noteCanvas(ctx) {
    const im = ctx.img('note'), b = 34, c = document.createElement('canvas');
    c.width = im.width + b * 2; c.height = im.height + b * 2;
    const g = c.getContext('2d'); g.fillStyle = '#fff'; g.beginPath(); g.roundRect(0, 0, c.width, c.height, 46); g.fill();
    g.drawImage(im, b, b); return c;
  },
  noteMesh(ctx, widthUnits) {
    const { THREE } = ctx, c = J.noteCanvas(ctx), tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 8;
    const h = widthUnits * c.height / c.width, grp = new THREE.Group();
    const sh = new THREE.Mesh(new THREE.PlaneGeometry(widthUnits, h), new THREE.MeshBasicMaterial({ color: J.DARK, transparent: true, opacity: 0.55 }));
    sh.position.set(0.06, -0.12, -0.02);
    const card = new THREE.Mesh(new THREE.PlaneGeometry(widthUnits, h), new THREE.MeshBasicMaterial({ map: tex, transparent: true, side: THREE.DoubleSide }));
    grp.add(sh, card); grp.userData = { card, sh, h };
    return grp;
  },
};

MOTION.scene({
  id: 's1', start: 0, end: 3.0,
  setup(ctx) {
    this.st = ctx.stage3D({ fov: 30, camera: [0, 0, 14], tone: 'none' });
    this.note = this.st.add(J.noteMesh(ctx, 3.1));
  },
  draw(t, lt, ctx) {
    const { X, at, E } = ctx;
    X.fillStyle = J.BLUE; X.fillRect(0, 0, ctx.W, ctx.H);

    // خطوط البراند الحمرا — ترسم نفسها من أول فريم
    J.stroke(ctx, X, [[-40, 1290], [120, 1250], [230, 1420], [300, 1600], [360, 1380], [330, 1100], [310, 930]], at(lt, 0, 0.9, 'cubicInOut'), 58);

    // العنوان: ثلاث أسطر، كل كلمة تطلع
    J.rise(ctx, X, 'شنو ممكن', 960, 420, { size: 175 }, lt, 0.0, 0.1);
    J.rise(ctx, X, 'الدينار', 960, 610, { size: 175 }, lt, 0.4);
    J.rise(ctx, X, 'ييب لك؟', 960, 800, { size: 175 }, lt, 0.75, 0.1);
    J.stroke(ctx, X, [[1000, 650], [860, 645], [700, 662], [560, 652]], at(lt, 0.65, 0.95, 'cubicOut'), 12);

    // الورقة: تجي من تحت يمين وهي تلف، وتستقر مايلة
    const k = at(lt, 0.15, 1.15, 'expoOut'), n = this.note;
    const bob = Math.sin(lt * 2.2) * 0.05;
    n.position.set(-0.05 + (1 - k) * 3.5, -0.95 + (1 - k) * -4.5 + bob, 0);
    n.rotation.set((1 - k) * -1.1, (1 - k) * 1.6 + Math.sin(lt * 1.3) * 0.08, 0.14 + (1 - k) * 0.8);
    n.scale.setScalar(0.95 + 0.05 * k + 0.025 * ctx.beatPulse(t, 7) * (lt > 1.2 ? 1 : 0));
    this.st.draw(X);
  },
});
