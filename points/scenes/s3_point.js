/* s3 — «في جامبو.. الدينار يعطيك نقطة» — الورقة تنقلب وتصير ختم النقطة */
MOTION.scene({
  id: 's3', start: 6.5, end: 10.5,
  setup(ctx) {
    const { THREE } = ctx;
    this.st = ctx.stage3D({ fov: 30, camera: [0, 0, 14], tone: 'none' });
    this.note = this.st.add(J.noteMesh(ctx, 3.3));
    // الختم كقطعة نقدية: وجهها نفس ختم جامبو
    const c = document.createElement('canvas'); c.width = c.height = 1024;
    const g = c.getContext('2d'); g.fillStyle = '#fff'; g.fillRect(0, 0, 1024, 1024);
    J.stamp(ctx, g, 512, 512, 512, { shadow: false });
    const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 8;
    tex.center.set(0.5, 0.5); tex.rotation = Math.PI / 2;   // وجه الأسطوانة يقلب الصورة — نرجّعها
    const side = new THREE.MeshBasicMaterial({ color: '#D9D9E3' }), face = new THREE.MeshBasicMaterial({ map: tex });
    this.coin = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.1, 0.2, 96), [side, face, face]);
    this.st.add(this.coin);
    this.Y = new THREE.Vector3(0, 1, 0);
    this.bits = ctx.particles2D({ count: 26, seed: 7, spawn: (i, r) => { const a = r() * 6.283, v = r.range(380, 900);
      return { x: 540, y: 1050, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 200, r: r.range(6, 14), color: r.pick([J.RED, '#fff', J.PALE]), delay: 1.6, life: 0.8, shape: r.pick(['circle', 'rect']) }; }, gravity: 900, drag: 1.5 });
  },
  draw(t, lt, ctx) {
    const { X, at } = ctx;
    X.fillStyle = J.BLUE; X.fillRect(0, 0, ctx.W, ctx.H);
    J.stroke(ctx, X, [[-30, 1120], [80, 1160], [170, 1360], [220, 1480], [260, 1300], [240, 1100]], at(lt, 0.2, 0.9, 'cubicInOut'), 54);

    J.rise(ctx, X, 'في جامبو..', 960, 290, { size: 96 }, lt, 0.05, 0.08);
    J.rise(ctx, X, 'الدينار يعطيك', 960, 450, { size: 130 }, lt, 0.3, 0.09);

    // «نقطة» — تنزل لحظة ما يصير الختم
    const kn = at(lt, 1.5, 1.85, 'expoOut');
    if (kn > 0) {
      X.save(); X.translate(960, 690); const s = 1.2 - 0.2 * kn; X.scale(s, s); X.globalAlpha = Math.min(1, kn * 2);
      ctx.text(X, 'نقطة', 0, 0, { family: 'display', weight: 900, size: 240, color: '#fff', align: 'right' });
      X.restore();
      J.stroke(ctx, X, [[1000, 745], [850, 737], [650, 752], [470, 742]], at(lt, 1.75, 2.05, 'cubicOut'), 13);
    }

    // الورقة ← تنقلب حول Y ← نص اللفة تصير قطعة الختم
    const kin = at(lt, 0.1, 0.8, 'expoOut'), flip = at(lt, 1.05, 1.6, 'cubicInOut');
    const ang = flip * Math.PI, half = flip >= 0.5, y0 = -0.15, bob = Math.sin(lt * 2.4) * 0.04;
    this.note.visible = !half; this.coin.visible = half;
    this.note.position.set((1 - kin) * -4, y0 + (1 - kin) * -3 + bob, 0);
    this.note.rotation.set(0, ang + (1 - kin) * -1.2, -0.1 * (1 - flip) + (1 - kin) * -0.5);
    this.note.scale.setScalar(1 - 0.4 * flip);
    const settle = at(lt, 1.6, 2.1, 'expoOut'), pulse = lt > 2.1 ? 0.035 * ctx.beatPulse(t, 7) : 0;
    this.coin.position.set(0, y0 + bob, 0.2);
    this.coin.rotation.set(Math.PI / 2, 0, 0);
    this.coin.rotateOnWorldAxis(this.Y, ang - Math.PI + Math.sin(lt * 1.6) * 0.14 * settle);
    this.coin.scale.setScalar((0.85 + 0.15 * settle) * (1 + pulse));
    this.st.draw(X);
    this.bits.draw(X, lt);

    // شريطة «= نقطة» على طرف الختم
    const kr = at(lt, 1.95, 2.3, 'expoOut');
    if (kr > 0) J.ribbon(ctx, X, 560, 1300, 290, 96, '= نقطة', { rot: -0.08 + (1 - kr) * 0.4, s: 0.9 + 0.1 * kr });

    J.rise(ctx, X, 'وكل نقطة تقربك من', 540, 1430, { size: 54, family: 'body', weight: 400, align: 'center' }, lt, 2.5, 0.05);
    J.rise(ctx, X, 'جوائز منوعة', 540, 1494, { size: 60, family: 'display', weight: 900, align: 'center' }, lt, 2.7, 0.06);
  },
});
