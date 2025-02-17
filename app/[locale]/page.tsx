import Part1 from "../components/Part1";
import Part2 from "../components/Part2";
import Part3 from "../components/Part3";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Part1 />
      <Part2 />
      <Part3 />
    </main>
  );
}
