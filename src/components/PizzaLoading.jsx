import React from 'react';
import ContentLoader from 'react-content-loader';

export function PizzaLoading(props) {
  return (
    <ContentLoader
      className="pizza-block"
      speed={2}
      width={280}
      height={460}
      viewBox="0 0 280 460"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}>
      <circle cx="139" cy="141" r="122" />
      <rect x="0" y="295" rx="3" ry="3" width="280" height="33" />
      <rect x="1" y="341" rx="6" ry="6" width="280" height="67" />
      <rect x="1" y="426" rx="3" ry="3" width="91" height="31" />
      <rect x="144" y="419" rx="9" ry="9" width="131" height="37" />
    </ContentLoader>
  );
}
