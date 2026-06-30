import { useEffect, useRef, useState } from "react";
import ForceGraph2D from "react-force-graph-2d";
import { getGraph } from "../api/graph";
import { Box, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

type GraphNode = {
  id: string;
  title: string;
  artist: string;
  tags?: string[];
  x?: number;
  y?: number;
};

type GraphLink = {
  source: any;
  target: any;
  weight?: number;
  type?: string;
};

type GraphData = {
  nodes: GraphNode[];
  links: GraphLink[];
};

// 🎨 stable artist colors
const artistColors = new Map<string, string>();
const palette = [
  "#ff6b6b",
  "#4dabf7",
  "#51cf66",
  "#ffd43b",
  "#845ef7",
  "#ff922b",
  "#20c997",
];

let colorIndex = 0;
function getArtistColor(artist: string) {
  if (!artistColors.has(artist)) {
    artistColors.set(artist, palette[colorIndex % palette.length]);
    colorIndex++;
  }
  return artistColors.get(artist)!;
}

// 🏛 movement extraction
const getMovement = (tags: string[] = []) => {
  const movements = [
    "renaissance",
    "baroque",
    "romanticism",
    "neoclassicism",
    "symbolism",
    "realism",
    "gothic",
  ];

  return (
    tags.find((t) => movements.includes(t.toLowerCase())) || "unknown"
  );
};

export default function GraphView() {
  const [graph, setGraph] = useState<GraphData | null>(null);
  const [focusNode, setFocusNode] = useState<any>(null);

  const fgRef = useRef<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getGraph()
      .then(setGraph)
      .catch(console.error);
  }, []);

  // 🧲 GRAPH PHYSICS (FIXED FOR REAL STRUCTURE)
  useEffect(() => {
    if (!fgRef.current) return;

    fgRef.current.d3Force("charge").strength(-160);
    fgRef.current.d3Force("link").distance((l: any) => {
      return 70 + (l.weight || 1) * 8;
    });
  }, [graph]);

  // 🌌 focus zoom
  useEffect(() => {
    if (!focusNode || !fgRef.current || !graph) return;

    const node = graph.nodes.find((n) => n.id === focusNode.id);
    if (!node) return;

    fgRef.current.centerAt(node.x, node.y, 800);
    fgRef.current.zoom(2.2, 900);
  }, [focusNode]);

  if (!graph) return <div>Loading graph...</div>;

  // 🔗 neighbors
  const isNeighbor = (node: any) => {
    if (!focusNode) return true;

    return graph.links.some((l: any) => {
      const source = l.source.id || l.source;
      const target = l.target.id || l.target;

      return (
        (source === focusNode.id && target === node.id) ||
        (target === focusNode.id && source === node.id)
      );
    });
  };

  return (
    <Box w="100vw" h="100vh" bg="black" position="relative">

      {/* 🧭 INFO PANEL */}
      {focusNode && (
        <Box
          position="absolute"
          top="20px"
          right="20px"
          w="280px"
          bg="rgba(0,0,0,0.85)"
          color="white"
          p={4}
          borderRadius="10px"
          border="1px solid rgba(255,255,255,0.1)"
        >
          <VStack align="start" spacing={2}>
            <Text fontSize="lg" fontWeight="bold">
              {focusNode.title}
            </Text>

            <Text fontSize="sm" opacity={0.8}>
              👨‍🎨 {focusNode.artist}
            </Text>

            <Text fontSize="sm" opacity={0.8}>
              🏛 Category: {getMovement(focusNode.tags)}
            </Text>

            <Text fontSize="xs" opacity={0.6} mt={2}>
              🎨 Color = artist grouping
            </Text>

            <Text fontSize="xs" opacity={0.6}>
              🔗 Lines = relationships
            </Text>
          </VStack>
        </Box>
      )}

      <ForceGraph2D
        ref={fgRef}
        graphData={graph}

        // 🧲 IMPORTANT: more “alive” physics
        cooldownTicks={300}
        d3AlphaDecay={0.02}
        d3VelocityDecay={0.12}

        // 🔗 LINKS (MAKE GRAPH STRUCTURE VISIBLE)
        linkColor={() => "rgba(255,255,255,0.38)"}
        linkWidth={(l: any) => Math.max(1, (l.weight || 1) / 2)}

        // 🖱 interactions
        onNodeClick={(node: any) => setFocusNode(node)}

        onNodeRightClick={(node: any) => {
          setFocusNode(null);
          navigate(`/painting/${node.id}`);
        }}

        // 🎨 NODE RENDERING (BALANCED GRAPH STYLE)
        nodeCanvasObject={(node: any, ctx, globalScale) => {
          const color = getArtistColor(node.artist);

          const neighbor = isNeighbor(node);

          // 🧠 balanced sizing (keeps graph readable)
          const size = focusNode
            ? node.id === focusNode.id
              ? 7
              : neighbor
              ? 5
              : 3
            : 4;

          // 🌫 subtle fade (NOT destructive)
          const alpha = focusNode
            ? neighbor
              ? 1
              : 0.35
            : 1;

          // 🌟 subtle glow (not overpowering)
          ctx.beginPath();
          ctx.arc(node.x, node.y, size + 2, 0, Math.PI * 2);
          ctx.fillStyle = color + "25";
          ctx.fill();

          // 🔵 node
          ctx.beginPath();
          ctx.arc(node.x, node.y, size, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.globalAlpha = alpha;
          ctx.fill();
          ctx.globalAlpha = 1;

          // 🏷 labels (always keep structure readable)
          const fontSize = 12 / globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          ctx.fillStyle = "rgba(255,255,255,0.85)";
          ctx.fillText(node.title, node.x + 6, node.y + 2);
        }}
      />
    </Box>
  );
}