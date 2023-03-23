import { Card } from '@mui/material';

function CardCustom({content, height, width}) {
  return (
    <Card className="card" style={{height: `${height}`, width: `${width}`}}>
      {content}
    </Card>
  );
}

export default CardCustom;