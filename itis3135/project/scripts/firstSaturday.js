

   (function computeNextFirstSaturday() {
    const now = new Date();
  
    // Returns the date of the first Saturday in a given month
    function firstSaturdayOf(year, monthIndex) {
      const d = new Date(year, monthIndex, 1);
      const day = d.getDay(); // 0=Sun..6=Sat
      const add = (6 - day + 7) % 7; // days to add until Saturday
      d.setDate(1 + add);
      return d;
    }
  
    let y = now.getFullYear();
    let m = now.getMonth();
    let firstSat = firstSaturdayOf(y, m);
  
    // If the first Saturday already passed, move to next month
    if (firstSat < new Date(y, m, now.getDate() + 1)) {
      m += 1;
      if (m > 11) { m = 0; y += 1; }
      firstSat = firstSaturdayOf(y, m);
    }
  
    const target = document.getElementById("cleanup-next-date");
    if (target) {
      const opts = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
      target.textContent = firstSat.toLocaleDateString(undefined, opts);
      target.setAttribute("datetime", firstSat.toISOString().slice(0, 10));
    }
  })();
  