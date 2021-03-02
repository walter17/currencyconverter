/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Typography } from '@material-ui/core';
import messages from './messages';

export default function NotFound() {
  return (
    <article>
      <Typography variant="h1">
        <FormattedMessage {...messages.header} />
      </Typography>
    </article>
  );
}
