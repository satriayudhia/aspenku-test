import React from "react";
import { Card } from "react-bootstrap";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const ProductCardLoading = () => {
  return (
    <Card className="default-card-product">
      <Skeleton width={185} height={186} />
      <Skeleton width={185} />
      <Skeleton width={185} />

      <Skeleton width={150} />

      <Skeleton width={100} />
      <Skeleton width={100} />
    </Card>
  );
};

export default ProductCardLoading;
