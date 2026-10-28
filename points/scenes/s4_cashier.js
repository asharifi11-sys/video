/* s4 — «عط الكاشير رقمك.. والنقاط تنحسب بروحها مع كل فاتورة» — فاتورة ترسم نفسها + ختم «انضافت نقاطك» */
MOTION.scene({
  id: 's4', start: 10.5, end: 14.5,
  setup(ctx) {
    this.plus = ctx.particles2D({ count: 18, seed: 4, spawn: (i, r) => ({ x: 300 + r.range(-60, 60), y: 1180, vx: r.gauss() * 160, vy: -r.range(500, 900), r: r.range(6, 11), color: r.pick([J.RED, J.BLUE]), delay: 2.0, life: 0.9, shape: 'circle' }), gravity: 800, drag: 1.2 });
  },
  draw(t, lt, ctx) {
    const { X, at } = ctx;
    X.fillStyle = '#fff'; X.fillRect(0, 0, ctx.W, ctx.H);
    J.stroke(ctx, X, [[-40, 60], [150, 40], [250, 30], [60, 200], [220, 290], [270, 440], [180, 640], [150, 700]], at(lt, 0, 0.8, 'cubicInOut'), 56);

    J.rise(ctx, X, 'عط الكاشير', 960, 290, { size: 130, color: J.BLUE }, lt, 0.1, 0.1);
    J.rise(ctx, X, 'رقمك..', 960, 450, { size: 130, color: J.BLUE }, lt, 0.3);
    J.rise(ctx, X, 'والنقاط تنحسب بروحها', 960, 560, { size: 56, family: 'body', weight: 400, color: J.BLUE }, lt, 0.6, 0.05);
    J.rise(ctx, X, 'مع كل فاتورة', 960, 635, { size: 56, family: 'body', weight: 400, color: J.BLUE }, lt, 0.75, 0.05);

    // الفاتورة — إطار يرسم نفسه
    X.save(); X.translate(300, 1000); X.rotate(0.04);
    const kp = at(lt, 0.4, 1.1, 'cubicInOut'), W = 255, H = 290;
    if (kp > 0) {
      X.globalAlpha = Math.min(1, kp * 3); X.fillStyle = '#E6EDFB'; X.fillRect(-W + 14, -H + 14, W * 2, H * 2 + 60); X.fillStyle = '#fff'; X.fillRect(-W, -H, W * 2, H * 2 + 60); X.globalAlpha = 1;
      ctx.drawPath(X, [[-W, -H], [W, -H], [W, H + 40], [W - 50, H + 10], [W - 100, H + 50], [W - 150, H + 15], [-W, H + 60], [-W, -H]], kp, { width: 9, color: J.BLUE, cap: 'round' });
    }
    const kc = at(lt, 0.9, 1.3, 'expoOut');
    if (kc > 0) {
      X.globalAlpha = kc;
      X.fillStyle = J.BLUE; X.beginPath(); X.arc(0, -H + 90, 58, 0, 6.2832); X.fill();
      const e = ctx.img('emblem'); X.drawImage(e, -40, -H + 50, 80, 80);
      X.fillStyle = '#B9CBF1'; for (const [y, w] of [[-100, 340], [-60, 260]]) { X.beginPath(); X.roundRect(-w / 2, y, w, 16, 8); X.fill(); }
      X.strokeStyle = J.BLUE; X.lineWidth = 4; X.setLineDash([16, 12]); X.beginPath(); X.moveTo(-210, -10); X.lineTo(210, -10); X.stroke(); X.setLineDash([]);
      X.fillStyle = '#EAF0FC'; X.beginPath(); X.roundRect(-215, 25, 430, 70, 14); X.fill();
      ctx.text(X, 'رقم الجوال', 200, 72, { family: 'body', weight: 700, size: 30, color: J.BLUE, align: 'right' });
      X.fillStyle = '#B9CBF1'; for (const y of [140, 185, 230]) { X.beginPath(); X.roundRect(-210, y, 190, 14, 7); X.fill(); X.beginPath(); X.roundRect(130, y, 80, 14, 7); X.fill(); }
      X.globalAlpha = 1;
    }
    // الرقم ينكتب
    const num = '3XXX XXXX', kt = at(lt, 1.3, 1.85, 'linear');
    if (kt > 0) {
      const n = Math.round(num.length * kt);
      ctx.text(X, num.slice(0, n), -200, 72, { family: 'num', weight: 800, size: 36, color: J.BLUE, align: 'left', dir: 'ltr' });
      if (kt < 1 && Math.floor(lt * 6) % 2 === 0) { X.fillStyle = J.BLUE; X.fillRect(-200 + n * 21, 42, 4, 38); }
    }
    X.restore();

    // ختم «انضافت نقاطك» يدق
    const ks = at(lt, 2.0, 2.25, 'expoOut');
    if (ks > 0) {
      const thump = 1.35 - 0.35 * ks, sh = lt < 2.35 ? Math.sin(lt * 80) * 6 * (1 - ks) : 0;
      J.stamp(ctx, X, 250 + sh, 1180, 120, { s: thump, rot: -0.15 });
      J.ribbon(ctx, X, 270, 1300, 300, 70, 'انضافت نقاطك', { rot: -0.12, s: thump });
    }
    this.plus.draw(X, lt);
    const kp1 = at(lt, 2.1, 2.9, 'cubicOut');
    if (kp1 > 0 && kp1 < 1) ctx.text(X, '+1', 380, 1080 - 160 * kp1, { family: 'num', weight: 900, size: 90, color: J.RED, dir: 'ltr', alpha: 1 - kp1 * kp1 });

    // «سحب كل شهر» — بطاقة زرقا بظل أحمر
    const kb = at(lt, 2.5, 2.85, 'expoOut');
    if (kb > 0) {
      X.save(); X.translate(760, 990 + (1 - kb) * 80); X.rotate((1 - kb) * 0.15); const s = 0.94 + 0.06 * kb; X.scale(s, s); X.globalAlpha = kb;
      X.fillStyle = J.RED; X.beginPath(); X.roundRect(-180 + 14, -120 + 18, 360, 240, 46); X.fill();
      X.fillStyle = J.BLUE; X.beginPath(); X.roundRect(-180, -120, 360, 240, 46); X.fill();
      ctx.text(X, 'سحب', 0, -12, { family: 'display', weight: 900, size: 92, color: '#fff' });
      ctx.text(X, 'كل شهر', 0, 82, { family: 'display', weight: 900, size: 92, color: '#fff' });
      X.restore();
    }
  },
});
