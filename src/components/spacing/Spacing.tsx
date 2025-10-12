import React from 'react';

type SpacingProps = {
	size: number;
};

export const Spacing: React.FC<SpacingProps> = ({ size }) => {
	return <div style={{ height: size }} />;
};
