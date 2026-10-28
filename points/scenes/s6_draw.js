/* s6 — «السحب الأول 30 نوفمبر» — ورقة تقويم تنزل + دائرة حمرا على الـ30 + «كل ما غسلت أكثر.. فرصتك أكبر!» */
MOTION.scene({
  id: 's6', start: 18.5, end: 21.5,
  setup(ctx) {
    this.conf = ctx.particles2D({ count: 40, seed: 9, spawn: (i, r) => { const a = -Math.PI / 2 + r.gauss() * 0.9, v = r.range(600, 1200);
      return { x: 540, y: 840, vx: Math.cos(a) * v, vy: Math.sin(a) * v, r: r.range(7, 14), color: r.pick([J.RED, '#fff', J.PALE]), delay: 1.05, life: 1.2, shape: r.pick(['rect', 'circle', 'tri']) }; }, gravity: 1400, drag: 1.4 });
    this.coins = ctx.rng('coins');
  },
  draw(t, lt, ctx) {
    const { X, at } = ctx;
    X.fillStyle = J.BLUE; X.fillRect(0, 0, ctx.W, ctx.H);
    J.stroke(ctx, X, [[1100, 1180], [980, 1230], [930, 1080], [960, 900], [1100, 860]], at(lt, 0.1, 0.7, 'cubicInOut'), 54);

    J.rise(ctx, X, 'السحب الأول', 540, 330, { size: 130, align: 'center' }, lt, 0.05, 0.1);

    // ورقة التقويم
    const kc = at(lt, 0.3, 0.75, 'expoOut');
    if (kc > 0) {
      X.save(); X.translate(540, 820 - (1 - kc) * 260); X.rotate(-0.05 + (1 - kc) * -0.25 + Math.sin(lt * 2) * 0.01); X.globalAlpha = Math.min(1, kc * 2);
      const w = 480, h = 520;
      X.fillStyle = J.DARK; X.beginPath(); X.roundRect(-w / 2 + 14, -h / 2 + 20, w, h, 40); X.fill();
      X.fillStyle = '#fff'; X.beginPath(); X.roundRect(-w / 2, -h / 2, w, h, 40); X.fill();
      X.fillStyle = J.RED; X.beginPath(); X.roundRect(-w / 2, -h / 2, w, 140, [40, 40, 0, 0]); X.fill();
      for (const x of [-120, 120]) { X.fillStyle = J.DARK; X.beginPath(); X.roundRect(x - 12, -h / 2 - 34, 24, 70, 12); X.fill(); }
      ctx.text(X, 'نوفمبر', 0, -h / 2 + 100, { family: 'display', weight: 900, size: 74, color: '#fff' });
      const kn = at(lt, 0.6, 0.95, 'expoOut'), s = 1.3 - 0.3 * kn;
      X.save(); X.translate(0, 140); X.scale(s, s);
      ctx.text(X, '30', 0, 0, { family: 'num', weight: 900, size: 260, color: J.BLUE, dir: 'ltr', alpha: kn });
      X.restore();
      // دائرة يدوية حمرا حول الرقم
      const pts = []; for (let i = 0; i <= 40; i++) { const a = -2.2 + i / 40 * 6.9, rr = 1 + 0.04 * Math.sin(i * 0.9); pts.push([Math.cos(a) * 200 * rr, 50 + Math.sin(a) * 150 * rr]); }
      J.stroke(ctx, X, pts, at(lt, 0.95, 1.35, 'cubicOut'), 12);
      X.restore();
    }
    this.conf.draw(X, lt);

    J.rise(ctx, X, 'كل ما غسلت أكثر..', 540, 1300, { size: 64, family: 'body', weight: 400, align: 'center' }, lt, 1.4, 0.06);
    const kf = at(lt, 1.8, 2.1, 'expoOut');
    if (kf > 0) {
      X.save(); X.translate(540, 1440); const s = 1.2 - 0.2 * kf; X.scale(s, s);
      ctx.text(X, 'فرصتك أكبر!', 0, 0, { family: 'display', weight: 900, size: 120, color: '#fff', alpha: Math.min(1, kf * 2) });
      X.restore();
    }
  },
});
