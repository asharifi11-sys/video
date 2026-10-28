/* s7 — الختام: ختم جامبو + «كل دينار = نقطة» + «عط الكاشير رقمك» */
MOTION.scene({
  id: 's7', start: 21.5, end: 25.0,
  draw(t, lt, ctx) {
    const { X, at } = ctx;
    X.fillStyle = J.RED; X.fillRect(0, 0, ctx.W, ctx.H);

    // حلقة بيضا ترسم نفسها حول الفيل
    const kr = at(lt, 0.1, 0.8, 'cubicInOut'), cx = 540, cy = 720, R = 250;
    const pts = []; for (let i = 0; i <= 64; i++) { const a = -Math.PI / 2 + i / 64 * 6.2832; pts.push([cx + Math.cos(a) * R, cy + Math.sin(a) * R]); }
    if (kr > 0) ctx.drawPath(X, pts, kr, { width: 34, color: '#fff', cap: 'round' });
    const ke = at(lt, 0.35, 0.8, 'expoOut');
    if (ke > 0) {
      const s = (0.94 + 0.06 * ke) * (1 + 0.025 * (lt > 1 ? ctx.beatPulse(t, 7) : 0)), er = 180 * s;
      X.save(); X.globalAlpha = ke; X.drawImage(ctx.img('emblem'), cx - er, cy - er, er * 2, er * 2); X.restore();
    }

    J.rise(ctx, X, 'كل دينار = نقطة', 540, 1150, { size: 120, align: 'center' }, lt, 0.7, 0.09);

    // زر «عط الكاشير رقمك»
    const kb = at(lt, 1.2, 1.55, 'expoOut');
    if (kb > 0) {
      X.save(); X.translate(540, 1290 + (1 - kb) * 50); const s = 0.94 + 0.06 * kb; X.scale(s, s); X.globalAlpha = kb;
      X.fillStyle = J.DARK; X.beginPath(); X.roundRect(-330 + 10, -64 + 12, 660, 128, 64); X.fill();
      X.fillStyle = '#fff'; X.beginPath(); X.roundRect(-330, -64, 660, 128, 64); X.fill();
      ctx.text(X, 'عط الكاشير رقمك', 0, 26, { family: 'display', weight: 900, size: 72, color: J.BLUE });
      X.restore();
    }
    J.rise(ctx, X, 'السحب الأول 30 نوفمبر', 540, 1460, { size: 56, family: 'body', weight: 700, align: 'center' }, lt, 1.6, 0.06);
  },
});
