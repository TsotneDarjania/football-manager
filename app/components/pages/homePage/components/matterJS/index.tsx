"use client";

import React, { useEffect, useRef } from "react";
import Matter from "matter-js";
import style from "./style.module.css";

export function MatterJSScene() {
  const matterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      if (!matterRef.current) return;

      // module aliases
      const Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Bodies = Matter.Bodies,
        Composite = Matter.Composite,
        Constraint = Matter.Constraint,
        Mouse = Matter.Mouse,
        MouseConstraint = Matter.MouseConstraint,
        Events = Matter.Events;

      // create an engine
      const engine = Engine.create();

      // create a renderer
      const render = Render.create({
        element: matterRef.current,
        engine: engine,
        options: {
          width: window.innerWidth,
          height: window.innerHeight,
          wireframes: false, // Better for seeing actual shapes
          background: "transparent",
        },
      });

      // create a swinging banner
      const banner = Bodies.rectangle(400, 300, 300, 200, {
        render: {
          fillStyle: "rgb(145, 223, 187)",
          strokeStyle: "rgb(61, 104, 84)",
          lineWidth: 20,
        },
      });

      // create a constraint to act as a pivot point
      const pivot = Constraint.create({
        pointA: { x: window.innerWidth / 2, y: -400 }, // fixed point in the space
        bodyB: banner, // the banner body
        pointB: { x: 0, y: -106 }, // relative position on the banner
        stiffness: 0.1, // how stiff the constraint is
        length: 600, // the length of the constraint
        render: {
          lineWidth: 10, // Increase the width of the line
          strokeStyle: "rgb(61, 104, 84)", // Color of the line
        },
      });

      // add all of the bodies and constraints to the world
      Composite.add(engine.world, [banner, pivot]);

      // create mouse constraint
      const mouse = Mouse.create(render.canvas);
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 1,
          render: {
            visible: false,
          },
        },
      });
      Composite.add(engine.world, mouseConstraint);

      // add an initial force to the banner to get it swinging
      Matter.Body.applyForce(
        banner,
        { x: banner.position.x, y: banner.position.y },
        { x: 0.85, y: 0.5 }
      );

      // Custom rendering function for the banner
      Events.on(render, "afterRender", function () {
        const context = render.context;
        const { x, y } = banner.position;
        const angle = banner.angle;

        context.save();
        context.translate(x, y);
        context.rotate(angle);

        // Draw banner background
        context.fillStyle = "rgb(49, 170, 114)";
        context.fillRect(-150, -100, 300, 200);

        // Draw text
        context.strokeStyle = "rgb(21, 55, 58)";
        // context.fillStyle = "white";
        context.font = "43px italic";
        context.letterSpacing = "2px";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.lineWidth = 3;
        context.strokeText("Marble Arena", 0, -30);

        // Draw text - Open 24 hours
        context.font = "italic 20px Arial";
        context.strokeText("Open 24 hours", 0, 20);

        // Draw text - Open 24 hours
        context.font = "italic 20px Arial";
        context.strokeText("Play Anytime", 0, 45);

        context.restore();
      });

      // Add event listener for mouse click on the text
      matterRef.current.addEventListener("click", (event) => {
        const rect = matterRef.current!.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const clickY = event.clientY - rect.top;

        const textWidth = 300;
        const textHeight = 50;

        const bannerX = banner.position.x;
        const bannerY = banner.position.y;
        const bannerAngle = banner.angle;

        const relativeX = clickX - bannerX;
        const relativeY = clickY - bannerY;

        const rotatedX =
          relativeX * Math.cos(-bannerAngle) -
          relativeY * Math.sin(-bannerAngle);
        const rotatedY =
          relativeX * Math.sin(-bannerAngle) +
          relativeY * Math.cos(-bannerAngle);

        if (
          rotatedX >= -textWidth / 2 &&
          rotatedX <= textWidth / 2 &&
          rotatedY >= -textHeight / 2 &&
          rotatedY <= textHeight / 2
        ) {
          // alert("Text clicked!");
        }
      });

      // run the renderer
      Render.run(render);

      // create runner
      const runner = Runner.create();

      // run the engine
      Runner.run(runner, engine);

      // Add event listener for mouseover
      matterRef.current.addEventListener("mouseover", () => {
        Matter.Body.applyForce(
          banner,
          { x: banner.position.x, y: banner.position.y },
          { x: 0.05, y: 0 }
        );
      });

      // cleanup function to stop the engine and renderer
      return () => {
        Render.stop(render);
        Runner.stop(runner);
        Engine.clear(engine);
        render.canvas.remove();
        render.textures = {};
      };
    }, 2000);
  }, []);

  return (
    <div className={"relative w-screen h-screen " + style.matterContainer}>
      <div
        className={"left-0 top-0 w-full h-full absolute "}
        ref={matterRef}
      ></div>
    </div>
  );
}
