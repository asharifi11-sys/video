/* s2 — «تكة.. شده كلينكس.. نص كوب كوفي.. وخلاص» — كل شي يطلع على نبضة */
MOTION.scene({
  id: 's2', start: 3.0, end: 6.5,
  draw(t, lt, ctx) {
    const { X, at, E } = ctx;
    X.fillStyle = J.BLUE; X.fillRect(0, 0, ctx.W, ctx.H);
    J.stroke(ctx, X, [[760, -20], [790, 150], [800, 300], [830, 160], [930, 60], [1100, -10]], at(lt, 0, 0.6, 'cubicOut'), 54);

    const items = [
      { img: 'tikka', w: 270, x: 205, y: 330, txt: 'تكة ..', ty: 380, t0: 0.15, rot: -0.06 },
      { img: 'tissue', w: 265, x: 205, y: 680, txt: 'شده كلينكس ..', ty: 720, t0: 0.85, rot: 0.05 },
      { img: 'coffee', w: 210, x: 205, y: 1030, txt: 'نص كوب كوفي ..', ty: 1060, t0: 1.55, rot: -0.04 },
    ];
    const fin = at(lt, 2.3, 2.5, 'expoOut');
    for (const it of items) {
      const k = at(lt, it.t0, it.t0 + 0.32, 'expoOut');
      if (k <= 0) continue;
      const im = ctx.img(it.img), h = it.w * im.height / im.width;
      const wob = Math.sin((lt - it.t0) * 3.1 + it.t0) * 0.025;
      // «وخلاص»: كل شي يرتجف ويصغر شوي — هذا اللي يجيبه الدينار بس
      const shake = lt > 2.3 ? Math.sin(lt * 70) * 9 * (1 - at(lt, 2.3, 2.75)) : 0;
      X.save(); X.translate(it.x + shake + (1 - k) * -120, it.y + (1 - k) * 60); X.rotate(it.rot + wob + (1 - k) * -0.3);
      const s = (0.94 + 0.06 * k) * (1 - 0.1 * fin); X.scale(s, s); X.globalAlpha = k;
      X.drawImage(im, -it.w / 2, -h / 2, it.w, h); X.restore();
      J.rise(ctx, X, it.txt, 960, it.ty, { size: 84 }, lt, it.t0 + 0.05, 0.07);
    }

    // «وخلاص» — تنزل ثقيلة
    const kw = at(lt, 2.3, 2.62, 'expoOut');
    if (kw > 0) {
      X.save(); X.translate(940, 1400 - (1 - kw) * 40); const s = 1.25 - 0.25 * kw; X.scale(s, s); X.globalAlpha = Math.min(1, kw * 2);
      ctx.text(X, 'وخلاص', 0, 0, { family: 'display', weight: 900, size: 250, color: '#fff', align: 'right' });
      X.restore();
    }
  },
});
