async function loadTimeline() {
  const res = await fetch("assets/data/timeline.json");

  const data = await res.json();

  const root = document.getElementById("timeline");

  root.innerHTML = "";

  data.forEach((item) => {
    const div = document.createElement("div");

    div.className = "node";

    div.innerHTML = `
    
    <div class="year">
    
    ${item.period}
    
    </div>
    
    <div class="content">
    
    <h3>
    
    ${item.company}
    
    </h3>
    
    <p>
    
    ${item.role}
    
    </p>
    
    </div>
    
    `;

    root.appendChild(div);
  });
}

loadTimeline();
