import React from "react"
import { arc } from "d3-shape"
import { scaleLinear } from "d3-scale"

export default function Gauge (props) {
  let backgroundArc = arc()
    .innerRadius(0.65)
    .outerRadius(1)
    .startAngle(-Math.PI / 2)
    .endAngle(Math.PI / 2)
    .cornerRadius(1)
    ()
    
  let percentScale = scaleLinear()
    .domain([0, 100])
    .range([0, 1])
  let percent = percentScale(props.value)

  let angleScale = scaleLinear()
    .domain([0, 1])
    .range([-Math.PI / 2, Math.PI / 2])
    .clamp(true)
  let angle = angleScale(percent)

  let filledArc = arc()
    .innerRadius(0.65)
    .outerRadius(1)
    .startAngle(-Math.PI / 2)
    .endAngle(angle)
    .cornerRadius(1)
    ()

  let colorScale = scaleLinear()
    .domain([0, 1])
    .range(props.colorRange)

  let gradientSteps = colorScale.ticks(10)
    .map(value => colorScale(value))

  return (
    <div>
      <svg style={{overflow: "visible"}}
        width="17vw"
        height="15vh"
        viewBox={[
          -1, -1,
          2, 1,
        ].join(" ")}>
        <defs>
          <linearGradient
            id={"Gauge__gradient"+props.label}
            gradientUnits="userSpaceOnUse"
            x1="-1.4"
            x2="1"
            y2="0">
            {gradientSteps.map((color, index) => (
              <stop
                key={color}
                stopColor={color}
                offset={`${
                  index
                  / (gradientSteps.length - 1)
                }`}
              />
            ))}
          </linearGradient>
        </defs>
        <path
          d={backgroundArc}
          fill={colorScale(0.1)}
        />
        <path
          d={filledArc}
          fill={"url(#Gauge__gradient"+props.label+")"}
        />
      </svg>
    </div>
  )

}