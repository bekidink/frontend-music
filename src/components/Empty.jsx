/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';

// Define styled components using Emotion
const Container = styled.div`
  display: flex;
  align-items: center;
  height: 8rem; /* Tailwind's h-32 is 8rem */
  justify-content: center;
`;

const Image = styled.img`
  object-fit: cover;
  height: 100%;
`;

export default function EmptyMusic() {
  return (
    <Container>
      <Image src='/musical.png' alt='Musical Icon' />
    </Container>
  );
}
