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

  let getCoordsOnArc = (angle, offset=10) => [
    Math.cos(angle - (Math.PI / 2)) * offset,
    Math.sin(angle - (Math.PI / 2)) * offset,
  ]

  let markerLocation = getCoordsOnArc(
    angle,
    1 - ((1 - 0.65) / 2),
  )

  return (
    <div
      style={{
        textAlign: "center",
      }}>
      <svg style={{overflow: "visible"}}
        width="15vw"
        height="12vw"
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

      {!!props.label && (
        <div style={{
          color: props.colorRange[1],
          marginTop: "-1.5em",
          fontSize: "1.3em",
          lineHeight: "1.3em",
          fontWeight: "700",
        }}>
          { props.label }
        </div>
      )}
    </div>
  )
  


}