import { FC } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { BusinessEntry } from '../../models';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import './style.scss';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../../constants';

interface IProps {
  entity: BusinessEntry;
}

export const BusinessCard: FC<IProps> = ({ entity }) => {
  let history = useHistory();

  const onClick = () => {
    history.push({
      pathname: ROUTES.DETAILED,
      search: `?name=${entity.displayWhat}`,
      state: { entity }
    });
  }

  return <Card sx={{ minWidth: 275 }}>
    <CardContent>
      <Typography color="text.secondary" gutterBottom>
        {entity.displayWhat}
      </Typography>
      <Typography variant="body2">
        <br></br>
        {entity.displayWhere}
      </Typography>
    </CardContent>
    <CardActions>
      <Button onClick={onClick} size="small">Check details</Button>
    </CardActions>
  </Card>
}