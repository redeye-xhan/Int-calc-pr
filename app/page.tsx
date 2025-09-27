"use client";
import Particles from "@/components/Background";
import React, { useState, MouseEvent, CSSProperties } from "react";

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  style?: CSSProperties;
}

// Animated Button Component with TypeScript props
const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  onClick,
  className,
  style,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const onMouseEnter = () => {
    setIsHovered(true)

  }
  const onMouseLeave = () => {
    setIsHovered(false)
  }
  // console.log(children)

  return (
    <button
      onClick={onClick}
      className={className}
      style={{
        // background: isHovered?"#7a7a7aff":"#333333",

background: children === "C"
  ? "#ff3b30"
  : ["⌫", "+", "−", "×", "÷", "%", "±"].includes(children as string)
  ? "#ff9500"
  : "#333333",
        border: "none",
        borderRadius: "12px",
        boxShadow: "#1a1a1a 0 5px 0",
        color: "#ffffff",
        fontSize: "1.6rem",
        cursor: "pointer",
        userSelect: "none",
        transition: "transform 0.2s ease, box-shadow 0.3s ease",
        padding: "20px 0",
        width: "80px",
        ...style,
      }}
      onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.95)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
      onMouseEnter={(e) => onMouseEnter()}
      onMouseLeave={(e) => onMouseLeave()}
    >
      {children}
    </button>
  );
};

const Calculator: React.FC = () => {
  const [expression, setExpression] = useState<string>("0");
  const [resetScreen, setResetScreen] = useState<boolean>(false);

  const operators: string[] = ["+", "-", "*", "/"];

  const appendValue = (val: string) => {
    if (resetScreen) {
      setExpression(val);
      setResetScreen(false);
    } else {
      if (expression === "0" && !operators.includes(val)) {
        setExpression(val);
      } else {
        setExpression(expression + val);
      }
    }
  };

  const handleOperator = (op: string) => {
    if (resetScreen) setResetScreen(false);

    if (operators.includes(expression.slice(-1))) {
      setExpression(expression.slice(0, -1) + op);
    } else {
      setExpression(expression + op);
    }
  };

  const calculate = () => {
    try {
      // Use Function constructor carefully, but here okay for calculator
      // eslint-disable-next-line no-new-func
      const result = Function(`"use strict"; return (${expression})`)();
      setExpression(String(result));
      setResetScreen(true);
    } catch {
      setExpression("Error");
      setResetScreen(true);
    }
  };

  const clearAll = () => {
    setExpression("0");
    setResetScreen(false);
  };

  const backspace = () => {
    if (resetScreen) {
      clearAll();
      return;
    }
    if (expression.length <= 1) {
      setExpression("0");
    } else {
      setExpression(expression.slice(0, -1));
    }
  };

  const toggleSign = () => {
    try {
      const val = parseFloat(expression);
      if (!isNaN(val)) {
        setExpression(String(val * -1));
      }
    } catch { }
  };

  const addDecimal = () => {
    if (resetScreen) {
      setExpression("0.");
      setResetScreen(false);
      return;
    }
    if (!expression.includes(".")) {
      setExpression(expression + ".");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#000000",
        position: "relative",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Particles background */}
      <Particles
        particleColors={["#ffffff", "#ffffff"]}
        particleCount={200}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover={true}
        alphaParticles={false}
        disableRotation={false}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          zIndex: 0,
        }}
      />

      {/* Calculator container */}
      <div
        style={{
          position: "absolute",
          top: "60px",
          left: "50%",
          transform: "translateX(-50%)",
          // maxWidth: 360,
          // width: "90%",
          backgroundColor: "#222222",
          padding: 30,
          borderRadius: 25,
          userSelect: "none",
        }}
      >
        {/* Display */}
        <div
          style={{
            backgroundColor: "#000000",
            color: "#00ff99",
            fontSize: expression.length===12?"2rem":"3rem",
            borderRadius: 20,
            padding: "20px 30px",
            minHeight: 80,
            textAlign: "right",
            overflowX: "auto",
            boxShadow: "inset 0 0 15px #00ff99",
            marginBottom: 25,
            fontFamily: "'Roboto Mono', monospace",
            userSelect: "text", width:"400px"
          }}
          aria-live="polite"
        >
          {expression}
        </div>

        {/* Buttons */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 15,
          }}
        >
          {/* Clear */}
          <AnimatedButton className="btn-clear" onClick={clearAll}>
            C
          </AnimatedButton>

          {/* Backspace */}
          <AnimatedButton className="btn-backspace" onClick={backspace}>
            ⌫
          </AnimatedButton>

          {/* Toggle Sign */}
          <AnimatedButton className="btn-toggle" onClick={toggleSign}>
            ±
          </AnimatedButton>
          <AnimatedButton className="btn-toggle" onClick={toggleSign}>
            %
          </AnimatedButton>
          {/* Divide */}

          {/* Numbers 7,8,9 */}
          {[7, 8, 9].map((num) => (
            <AnimatedButton key={num} onClick={() => appendValue(String(num))}>
              {num}
            </AnimatedButton>
          ))}

          <AnimatedButton
            className="btn-operator"
            onClick={() => handleOperator("/")}
          >
            ÷
          </AnimatedButton>
          {/* Multiply */}

          {/* Numbers 4,5,6 */}
          {[4, 5, 6].map((num) => (
            <AnimatedButton key={num} onClick={() => appendValue(String(num))}>
              {num}
            </AnimatedButton>
          ))}
          <AnimatedButton
            className="btn-operator"
            onClick={() => handleOperator("*")}
          >
            ×
          </AnimatedButton>

          {/* Numbers 1,2,3 */}
          {[1, 2, 3].map((num) => (
            <AnimatedButton key={num} onClick={() => appendValue(String(num))}>
              {num}
            </AnimatedButton>
          ))}

          {/* Add */}
          {/* Subtract */}
          <AnimatedButton
            className="btn-operator"
            onClick={() => handleOperator("-")}
          >
            −
          </AnimatedButton>

          <AnimatedButton
            style={{ fontSize: "1.6rem" }}
            onClick={() => appendValue("0")}
          >
            0
          </AnimatedButton>

          {/* Decimal */}
          <AnimatedButton onClick={addDecimal}>.</AnimatedButton>

          {/* Equals */}
          <AnimatedButton
            style={{
              background: "linear-gradient(135deg, #32cd32 0%, #00ff7f 100%)",
              color: "#0b0",
            }}
            onClick={calculate}
          >
            =
          </AnimatedButton>
          <AnimatedButton
            className="btn-operator"
            onClick={() => handleOperator("+")}
          >
            +
          </AnimatedButton>

          {/* Zero */}
        </div>
      </div>

      {/* Float animation keyframes */}
      <style>{`
        @keyframes floatAnime {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.1;
          }
          50% {
            transform: translateY(-15px) scale(1.05);
            opacity: 0.15;
          }
          100% {
            transform: translateY(0) scale(1);
            opacity: 0.1;
          }
        }
      `}</style>
    </div>
  );
};

export default Calculator;
