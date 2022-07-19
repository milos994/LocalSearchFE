import { useLocation } from 'react-router-dom';
import { BusinessDetailed } from '../../components/businessDetailed';
import { BusinessEntry } from '../../models';
import './style.scss';

export const DetailedPage = () => {
  const location: any = useLocation();
  return <BusinessDetailed entity={location.state.entity as BusinessEntry} />
}