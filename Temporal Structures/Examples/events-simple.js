// d3-events-foundation.js
// This script creates a D3.js timeline with personal milestones.

(function() {
  // Set up the SVG container
  const margin = { top: 40, right: 40, bottom: 60, left: 60 };
  const width = 800 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  // Create SVG element
  const svg = d3.select('#d3-container-1')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  // Replace these sample rows with your own personal milestones.
  const events = [
    { date: new Date('2018-09-01'), name: 'Started Design Study', category: 'education', location: 'Home / School', intensity: 72, note: 'A first structured encounter with design thinking.' },
    { date: new Date('2019-06-15'), name: 'First Portfolio', category: 'creative', location: 'Studio', intensity: 58, note: 'Collected early work and began seeing projects as a sequence.' },
    { date: new Date('2020-03-20'), name: 'Remote Learning Shift', category: 'transition', location: 'Online', intensity: 86, note: 'Daily rhythm changed and digital workflows became central.' },
    { date: new Date('2021-08-30'), name: 'Collaborative Project', category: 'creative', location: 'Studio', intensity: 64, note: 'Learned how teamwork changes design time.' },
    { date: new Date('2022-05-20'), name: 'Graduation / Completion', category: 'education', location: 'Campus', intensity: 90, note: 'A closing point that also opened the next phase.' },
    { date: new Date('2023-02-01'), name: 'Design Internship', category: 'work', location: 'Office', intensity: 76, note: 'Translated academic skills into a professional workflow.' },
    { date: new Date('2024-09-03'), name: 'GSAPP Semester Begins', category: 'education', location: 'New York', intensity: 92, note: 'A new academic environment with new temporal pressure.' },
    { date: new Date('2025-01-21'), name: 'Computational Workflows', category: 'creative', location: 'Columbia GSAPP', intensity: 88, note: 'Started using code as a design medium.' },
    { date: new Date('2025-04-15'), name: 'Temporal Structures', category: 'creative', location: 'Columbia GSAPP', intensity: 80, note: 'Mapped personal time through data visualization.' }
  ];

  // Create time scale
  const timeScale = d3.scaleTime()
    .domain(d3.extent(events, d => d.date))
    .range([0, width]);

  // Create y scale for event positioning
  const yScale = d3.scaleLinear()
    .domain([0, 100])
    .range([height - 50, 50]);

  // Create color scale for personal categories
  const colorScale = d3.scaleOrdinal()
    .domain(['education', 'creative', 'transition', 'work'])
    .range(['#2f80ed', '#f2994a', '#9b51e0', '#27ae60']);

  // Create x-axis (time axis)
  const xAxis = d3.axisBottom(timeScale)
    .tickFormat(d3.timeFormat('%b %Y'))
    .tickSize(-height + 100);

  // Add x-axis to SVG
  svg.append('g')
    .attr('class', 'x-axis')
    .attr('transform', `translate(0, ${height - 50})`)
    .call(xAxis)
    .selectAll('line')
    .attr('stroke', '#e0e0e0')
    .attr('stroke-dasharray', '2,2');

  // Style the axis
  svg.select('.x-axis')
    .selectAll('text')
    .style('font-size', '12px')
    .style('fill', '#666');

  // Add axis title
  svg.append('text')
    .attr('x', width / 2)
    .attr('y', height - 10)
    .attr('text-anchor', 'middle')
    .style('font-size', '14px')
    .style('fill', '#333')
    .text('Personal Milestones (2018-2025)');

  // Add events as circles with size based on intensity
  const eventCircles = svg.selectAll('.event-circle')
    .data(events)
    .enter()
    .append('circle')
    .attr('class', 'event-circle')
    .attr('cx', d => timeScale(d.date))
    .attr('cy', (d, i) => height - 100 - (i * 25)) // Y increases over time (earlier events at bottom)
    .attr('r', d => {
      if (d.intensity > 85) return 12;
      if (d.intensity > 70) return 10;
      return 8;
    })
    .attr('fill', d => colorScale(d.category))
    .attr('stroke', '#fff')
    .attr('stroke-width', 2)
    .style('cursor', 'pointer')
    .style('opacity', 0.8)
    .on('mouseover', function(event, d) {
      d3.select(this)
        .transition()
        .duration(200)
        .attr('r', d => {
          if (d.intensity > 85) return 16;
          if (d.intensity > 70) return 14;
          return 12;
        })
        .style('opacity', 1);
      
      // Show tooltip
      showTooltip(event, d);
    })
    .on('mouseout', function(event, d) {
      d3.select(this)
        .transition()
        .duration(200)
        .attr('r', d => {
          if (d.intensity > 85) return 12;
          if (d.intensity > 70) return 10;
          return 8;
        })
        .style('opacity', 0.8);
      
      // Hide tooltip
      hideTooltip();
    })
    .on('click', function(event, d) {
      console.log('Milestone clicked:', d);
      // Add click functionality here
    });

  // Add event labels
  svg.selectAll('.event-label')
    .data(events)
    .enter()
    .append('text')
    .attr('class', 'event-label')
    .attr('x', d => timeScale(d.date))
    .attr('y', (d, i) => height - 100 - (i * 25) - 15) // Labels above each event
    .attr('text-anchor', 'middle')
    .style('font-size', '10px')
    .style('fill', '#333')
    .style('pointer-events', 'none')
    .text(d => d.name);

  // Create tooltip
  const tooltip = d3.select('#d3-container-1')
    .append('div')
    .attr('class', 'tooltip')
    .style('position', 'absolute')
    .style('background', 'rgba(0, 0, 0, 0.9)')
    .style('color', 'white')
    .style('padding', '10px 15px')
    .style('border-radius', '6px')
    .style('font-size', '12px')
    .style('pointer-events', 'none')
    .style('opacity', 0)
    .style('transition', 'opacity 0.2s')
    .style('max-width', '200px');

  function showTooltip(event, d) {
    tooltip.transition()
      .duration(200)
      .style('opacity', 1);
    
    tooltip.html(`
      <strong>${d.name}</strong><br>
      Date: ${d3.timeFormat('%B %d, %Y')(d.date)}<br>
      Location: ${d.location}<br>
      Category: ${d.category}<br>
      Intensity: ${d.intensity}/100<br>
      Note: ${d.note}
    `)
    .style('left', (event.pageX + 10) + 'px')
    .style('top', (event.pageY - 10) + 'px');
  }

  function hideTooltip() {
    tooltip.transition()
      .duration(200)
      .style('opacity', 0);
  }

  // Add legend
  const legend = svg.append('g')
    .attr('class', 'legend')
    .attr('transform', `translate(20, 20)`);

  const legendItems = legend.selectAll('.legend-item')
    .data(['education', 'creative', 'transition', 'work'])
    .enter()
    .append('g')
    .attr('class', 'legend-item')
    .attr('transform', (d, i) => `translate(0, ${i * 20})`);

  legendItems.append('circle')
    .attr('r', 6)
    .attr('fill', d => colorScale(d))
    .attr('stroke', '#fff')
    .attr('stroke-width', 1);

  legendItems.append('text')
    .attr('x', 15)
    .attr('y', 4)
    .style('font-size', '12px')
    .style('fill', '#333')
    .text(d => d.charAt(0).toUpperCase() + d.slice(1));

  // Add subtitle
  svg.append('text')
    .attr('x', width / 2)
    .attr('y', -10)
    .attr('text-anchor', 'middle')
    .style('font-size', '12px')
    .style('fill', '#666')
    .style('font-style', 'italic')
    .text('A self-portrait built from selected moments in time');

  console.log('D3.js personal milestone timeline loaded successfully!');
})(); 
