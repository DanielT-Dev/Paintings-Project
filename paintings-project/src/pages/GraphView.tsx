import { useEffect, useState } from "react";
import ForceGraph2D from "react-force-graph-2d";
import axios from "axios";
import { Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

type GraphNode = {
  id: string;
  title: string;
  artist: string;
  x?: number;
  y?: number;
};

type GraphLink = {
  source: string;
  target: string;
};

type GraphData = {
  nodes: GraphNode[];
  links: GraphLink[];
};

export default function GraphView() {
  const [graph, setGraph] = useState<GraphData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get<GraphData>("http://localhost:5000/graph.json")
      .then((res) => setGraph(res.data));
  }, []);

  if (!graph) return <div>Loading graph...</div>;

  return (
    <Box w="100vw" h="100vh" bg="black">
      <ForceGraph2D
        graphData={graph}
        nodeLabel={(node) => `${node.title} — ${node.artist}`}
        nodeAutoColorBy="artist"
        linkDirectionalParticles={2}
        linkDirectionalParticleSpeed={0.005}
        onNodeClick={(node) => {
          navigate(`/painting/${node.id}`);
        }}
        nodeCanvasObject={(node: any, ctx, globalScale) => {
          const label = node.title;
          const fontSize = 12 / globalScale;

          ctx.font = `${fontSize}px Sans-Serif`;
          ctx.fillStyle = "white";
          ctx.fillText(label, node.x, node.y);
        }}
      />
    </Box>
  );
}