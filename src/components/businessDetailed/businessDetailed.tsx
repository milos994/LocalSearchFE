import { Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { groupBy } from 'lodash';
import { FC } from 'react';
import { BusinessEntry, Day, IDay, IOpeningHours } from '../../models';
import './style.scss';

const Item: FC<{ name: string, value?: string, children?: any }> = ({ name, value, children }) => {
  return (
    <div style={{ marginTop: '20px' }}>
      <Typography variant='h6'>{name}</Typography>
      {children || <div style={{ marginLeft: '20px', marginTop: '10px' }}>{value}</div>}
    </div>
  )
}

const days: Day[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

const WorkingDays = ({ openingHours }: { openingHours: IOpeningHours }) => {
  const daysHours: string[] = days.reduce((acc: string[], day: Day) => {
    if (!openingHours.days[day as Day]) {
      return [
        ...acc,
        `${day}#closed`
      ]
    } else {
      return [
        ...acc,
        `${day}#${openingHours.days[day as Day].map((d: IDay) => `${d.start}-${d.end}`).join(',')}`
      ]
    }
  }, []);

  const grouped = groupBy(daysHours, (d) => d.split('#')[1]);
  const getDay = (str: string[]) => {
    if (str.length === 1) {
      return str[0].split('#')[0];
    } else {
      const array = str.map((s) => s.split("#")[0]);
      return `${array[0]} - ${array[array.length - 1]}`;
    }
  }

  return <div>
    {Object.keys(grouped).map((key) => {
      return (<div style={{ marginTop: '20px' }}>
        <Typography className='day' variant='h6'>{getDay(grouped[key])}</Typography>
        {key.split(',').map((time) => {
          return <div style={{ marginLeft: '10px' }}>{time}</div>
        })}
      </div>)
    })}
  </div>
}

export const BusinessDetailed = ({ entity }: { entity: BusinessEntry }) => {
  return (
    <div className='businessDetailed'>
      <Paper elevation={3} className='paper'>
        <Typography variant='h4'>{entity?.displayWhat}</Typography>
        <div className='info'>
          <div className='info1'>
            <Item name={'Adress'} value={entity.displayWhere}></Item>
            <Item name={'Website'} value={entity.websites.join(',')}></Item>
            <Item name={'Phone'} value={entity.phoneNumbers.join(',')}></Item>
          </div>
          <div className='info2'>
            <Item name="Opening hours">
              <WorkingDays openingHours={entity.openingHours} />
            </Item>
          </div>
        </div>
      </Paper>
    </div>
  )
}