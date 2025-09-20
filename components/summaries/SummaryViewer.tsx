"use client";
import { useState } from "react";
import { Card, CardTitle, CardHeader, CardContent } from "../ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

const parseSection = (section: string) => {
  const [title, ...content] = section.split("\n");
  const cleanTitle = title.startsWith("#")
    ? title.substring(1).trim()
    : title.trim();

  const points: string[] = [];
  let currentPoint = "";

  content.forEach((line) => {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith("•")) {
      if (currentPoint) points.push(currentPoint.trim());
      currentPoint = trimmedLine;
    } else if (!trimmedLine) {
      if (currentPoint) points.push(currentPoint.trim());
      currentPoint = "";
    } else {
      currentPoint += " " + trimmedLine;
    }
  });

  if (currentPoint) points.push(currentPoint.trim());

  return {
    title: cleanTitle,
    points: points.filter(
      (point) =>
        point && !point.startsWith("#") && !point.startsWith("[Choose]"),
    ),
  };
};

const formatPoint = (point: string) => {
  // Remove bullet point and clean up
  const cleanPoint = point.replace(/^•\s*/, "").trim();

  // Extract emoji if present at the start
  const emojiMatch = cleanPoint.match(
    /^(\p{Emoji}|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]|\uD83D[\uDE80-\uDEFF])/u,
  );
  const emoji = emojiMatch ? emojiMatch[0] : null;
  const text = emoji ? cleanPoint.substring(emoji.length).trim() : cleanPoint;

  return { emoji, text };
};

export default function SummaryViewer({ summary }: { summary: string }) {
  const [currentSection, setCurrentSection] = useState(0);

  // Parse summary sections
  const sections = summary
    .split("\n# ")
    .map((section) => section.trim())
    .filter(Boolean)
    .map(parseSection);

  const hasMultipleSections = sections.length > 1;
  const currentSectionData = sections[currentSection] || {
    title: "Summary",
    points: [],
  };

  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const goToSection = (index: number) => {
    setCurrentSection(index);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold text-gray-800">
              {currentSectionData.title}
            </CardTitle>
            {hasMultipleSections && (
              <div className="flex items-center gap-2">
                <button
                  onClick={prevSection}
                  disabled={currentSection === 0}
                  className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                <span className="text-sm text-gray-600 min-w-[60px] text-center">
                  {currentSection + 1} of {sections.length}
                </span>
                <button
                  onClick={nextSection}
                  disabled={currentSection === sections.length - 1}
                  className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </div>

          {hasMultipleSections && (
            <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
              {sections.map((section, index) => (
                <button
                  key={index}
                  onClick={() => goToSection(index)}
                  className={`px-3 py-1 rounded-full text-sm whitespace-nowrap transition-colors ${
                    index === currentSection
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {section.title}
                </button>
              ))}
            </div>
          )}
        </CardHeader>

        <CardContent className="pt-0">
          {currentSectionData.points.length > 0 ? (
            <div className="space-y-3">
              {currentSectionData.points.map((point, index) => {
                const { emoji, text } = formatPoint(point);
                return (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    {emoji && (
                      <span className="text-xl flex-shrink-0 mt-0.5">
                        {emoji}
                      </span>
                    )}
                    <p className="text-gray-700 leading-relaxed flex-1">
                      {text}
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No content available for this section.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {hasMultipleSections && (
        <div className="flex justify-center mt-6 gap-2">
          {sections.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSection(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSection ? "bg-blue-500" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
