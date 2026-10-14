import type { Section } from '../types'

export const measuringWorkloads: Section = {
  id: 'measuring-workloads',
  title: 'Latency distributions, throughput and bottlenecks',
  scene: 'architecture-measure',
  focus: 'percentiles',
  slide: `## Measure before optimising

Optimisation starts with **measurement**, and the first thing to measure is the **shape** of latency, not its average.

### Read the distribution
- Median **120 ms**, mean **160 ms** — both look healthy
- **p99 is 900 ms**: one request in a hundred is slow
- At high traffic, the slow 1 % is thousands of customers an hour

### Find the bottleneck
- Break a slow request into **parts** and rank them
- The payments call is **68 %**; the database lock wait is **21 %**

### Then decide
- Optimise the **largest** share, or change the design around it
- Measure **throughput** at the same time: faster but fewer is no win`,
  narration:
    "This final chapter puts everything together, and it starts with a discipline: measure before optimising. The first thing to measure is the shape of latency, not its average. Look at the curve for the orders API over one week. The median is a hundred and twenty milliseconds, and the mean is a hundred and sixty. Both look healthy. But read along the curve. The ninety-fifth percentile is two hundred and ninety, and the ninety-ninth is nine hundred milliseconds. One request in a hundred takes nearly a second, and the slowest in a thousand take almost three. At sale traffic, that slow one percent is thousands of customers an hour, and they're often the ones with the biggest baskets, because bigger orders do more work. So averages hide exactly the experience that loses sales. Next, find the bottleneck. Take the slow requests and break them into parts, as chapter eleven's trace did. The payments call is sixty-eight percent of a ninety-ninth percentile request. Waiting for a lock on the stock row is twenty-one percent. Cold starts add a little for some requests, and everything else is tiny. That ranking decides the work. Optimising the code that takes three percent would change nothing a customer notices. Optimise the largest share, or change the design around it, for example by charging the card asynchronously. And measure throughput alongside latency, because a change that makes requests faster but serves fewer of them is no win. Next: serving some requests without reaching the application at all.",
}
