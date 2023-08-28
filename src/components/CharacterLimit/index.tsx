import cc from 'classcat';

import { CharacterLimitProps } from '../../types';

import classes from './styles.module.scss';

export const CharacterLimit: React.FC<CharacterLimitProps> = ({ charactersLeft, LIMIT_CHAR = 100, isLimit }) => (
  <span className={cc([classes.numberOfChar, { [classes.numberOfCharAlert]: isLimit }])}>
    {charactersLeft}/{LIMIT_CHAR}
  </span>
);
