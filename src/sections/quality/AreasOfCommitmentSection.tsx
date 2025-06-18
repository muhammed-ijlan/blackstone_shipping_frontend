import React from "react";
import PageSectionCard from "src/components/qualitySustainablity/PageSectionCard";

interface ImageNode {
  node: {
    sourceUrl: string;
  };
}

interface AreasOfCommitmentSectionProps {
  subTitle: string;
  content: string;
  mainImage: ImageNode;
  subImages: ImageNode[];
}

const AreasOfCommitmentSection: React.FC<AreasOfCommitmentSectionProps> = ({
  subTitle,
  content,
  mainImage,
  subImages,
}) => {
  return (
    <PageSectionCard
      subTitle={subTitle}
      content={content}
      imageUrl={mainImage.node.sourceUrl}
      images={subImages}
    />
  );
};

export default AreasOfCommitmentSection;
