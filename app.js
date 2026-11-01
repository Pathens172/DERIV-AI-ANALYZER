
if (market.price !== null) {
    updateText(
      "livePrice",
      market.price.toFixed(market.pipSize)
    );

    updateText("lastDigit", market.digit);
  }

  updateText("tickCount", ticks.length);

  if (!ticks.length) return;

  const stats = analyzeTicks(ticks);

  updateText(
    "evenPercent",
    stats.evenPercent.toFixed(1) + "%"
  );

  updateText(
    "oddPercent",
    stats.oddPercent.toFixed(1) + "%"
  );

  const signals = digitSignals(stats);

  if (ticks.length < CONFIG.minimumTicks) {
    displaySignal(
      "evenOddSignal",
      "WAIT",
      "Collecting more ticks"
    );

    displaySignal(
      "riseFallSignal",
      "WAIT",
      "Collecting more ticks"
    );

    displaySignal(
      "matchesSignal",
      "WAIT",
      "Collecting more ticks"
    );

    displaySignal(
      "differsSignal",
      "WAIT",
      "Collecting more ticks"
    );
  } else {
    displaySignal(
      "evenOddSignal",
      signals.evenOdd,
      ${signals.evenPercent.toFixed(1)}% even / ${signals.oddPercent.toFixed(1)}% odd
    );

    displaySignal(
      "riseFallSignal",
      signals.riseFall,
      ${signals.risePercent.toFixed(1)}% rise / ${signals.fallPercent.toFixed(1)}% fall
    );

    displaySignal(
      "matchesSignal",
      signals.matches,
      ${signals.matchesCount} historical occurrences
    );

    displaySignal(
      "differsSignal",
      signals.differs,
      ${signals.differsCount} historical occurrences
    );
  }

  updateText(
    "analysisStatus",
    ticks.length >= 100
      ? ${ticks.length} ticks analyzed
      : "Collecting data"
  );

  renderDigitStatistics(stats);
  renderTickHistory(ticks, market.pipSize);
  renderWindowAnalysis(ticks);
}

/* ==========================================
   CONNECTION BUTTON
========================================== */

function initializeControls() {
  const button = element("connectBtn");

  if (button) {
    button.addEventListener("click", connectDeriv);
  }
}

/* ==========================================
   APPLICATION START
========================================== */

function initializeApp() {
  initializeMarkets();
  initializeControls();

  console.log("Deriv AI Predictor starting...");

  connectDeriv();
}

document.addEventListener(
  "DOMContentLoaded",
  initializeApp
);