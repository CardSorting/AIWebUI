import { Link, Table, TableCell, TableRow } from '@mui/material';
import { FC } from 'react';
import { CookieTableProps } from './types';

const CookieTable: FC<CookieTableProps> = ({
  name,
  purpose,
  service,
  serviceUrl,
  expiration,
}) => (
  <Table size="small">
    <TableRow>
      <TableCell variant="head">Name</TableCell>
      <TableCell>{name}</TableCell>
    </TableRow>
    <TableRow>
      <TableCell variant="head">Purpose</TableCell>
      <TableCell>{purpose}</TableCell>
    </TableRow>
    <TableRow>
      <TableCell variant="head">Provider</TableCell>
      <TableCell>.pokecardmaker.net</TableCell>
    </TableRow>
    <TableRow>
      <TableCell variant="head">Service</TableCell>
      <TableCell>
        {service} <Link href={serviceUrl}>(View Service Privacy Policy)</Link>
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell variant="head">Country</TableCell>
      <TableCell>Netherlands</TableCell>
    </TableRow>
    <TableRow>
      <TableCell variant="head">Type</TableCell>
      <TableCell>http_cookie</TableCell>
    </TableRow>
    <TableRow>
      <TableCell variant="head">Expires in</TableCell>
      <TableCell>{expiration || '_____'}</TableCell>
    </TableRow>
  </Table>
);

export default CookieTable;
