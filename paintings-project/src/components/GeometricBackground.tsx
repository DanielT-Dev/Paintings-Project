import { Box } from "@chakra-ui/react";

export default function GeometricBackground() {
    return (
        <>
            {/* circles */}
            <Box sx={circle1} />
            <Box sx={circle2} />
            <Box sx={circle3} />
            <Box sx={circle4} />

            {/* squares */}
            <Box sx={square1} />
            <Box sx={square2} />
            <Box sx={square3} />

            {/* triangles */}
            <Box sx={triangle1} />
            <Box sx={triangle2} />
        </>
    );
}

const base = {
    position: "absolute",
    opacity: 0.25,
    pointerEvents: "none",
};

/* CIRCLES */
const circle1 = {
    ...base,
    top: "10%",
    left: "10%",
    w: "90px",
    h: "90px",
    bg: "blue.400",
    borderRadius: "50%",
    style: { animation: "float1 18s ease-in-out infinite" },
};

const circle2 = {
    ...base,
    top: "55%",
    right: "8%",
    w: "140px",
    h: "140px",
    bg: "purple.400",
    borderRadius: "50%",
    style: { animation: "float2 22s ease-in-out infinite" },
};

const circle3 = {
    ...base,
    bottom: "10%",
    left: "35%",
    w: "70px",
    h: "70px",
    bg: "orange.300",
    borderRadius: "50%",
    style: { animation: "float3 16s ease-in-out infinite" },
};

const circle4 = {
    ...base,
    top: "30%",
    left: "55%",
    w: "60px",
    h: "60px",
    bg: "yellow.300",
    borderRadius: "50%",
    style: { animation: "float2 20s ease-in-out infinite" },
};

/* SQUARES */
const square1 = {
    ...base,
    top: "20%",
    right: "25%",
    w: "80px",
    h: "80px",
    bg: "teal.400",
    style: {
        animation: "float2 20s ease-in-out infinite",
        transform: "rotate(15deg)",
    },
};

const square2 = {
    ...base,
    bottom: "25%",
    left: "10%",
    w: "100px",
    h: "100px",
    bg: "pink.400",
    style: {
        animation: "float1 24s ease-in-out infinite",
        transform: "rotate(-20deg)",
    },
};

const square3 = {
    ...base,
    top: "70%",
    left: "70%",
    w: "60px",
    h: "60px",
    bg: "red.300",
    style: {
        animation: "float3 19s ease-in-out infinite",
        transform: "rotate(25deg)",
    },
};

/* TRIANGLES */
const triangleBase = {
    width: 0,
    height: 0,
    position: "absolute",
    opacity: 0.25,
    pointerEvents: "none",
};

const triangle1 = {
    ...triangleBase,
    top: "5%",
    right: "40%",
    borderLeft: "45px solid transparent",
    borderRight: "45px solid transparent",
    borderBottom: "75px solid #63b3ed",
    style: { animation: "float3 19s ease-in-out infinite" },
};

const triangle2 = {
    ...triangleBase,
    bottom: "10%",
    right: "15%",
    borderLeft: "40px solid transparent",
    borderRight: "40px solid transparent",
    borderBottom: "70px solid #f6ad55",
    style: { animation: "float1 21s ease-in-out infinite" },
};