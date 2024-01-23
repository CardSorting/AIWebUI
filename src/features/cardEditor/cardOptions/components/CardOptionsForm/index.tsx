import { FC } from 'react';
import BasicsForm from '../blocks/BasicsForm';
import CardTypeForm from '../blocks/BasicsForm/fields/CardTypeForm';
import CardInfoForm from '../blocks/CardInfoForm';
import DebugForm from '../blocks/DebugForm';
import MovesForm from '../blocks/MovesForm';
import { Form } from './styles';
import CardDownloader from '../atoms/CardDownloader';
import TypeBarForm from '../blocks/TypeBarForm';
import ImagesForm from '../blocks/ImagesForm';
import ImportExport from '../atoms/ImportExport';
import DexStatsForm from '../blocks/DexStatsForm';

const CardOptionsForm: FC = () => (
  <Form as="form">
    <DebugForm />
    <CardTypeForm />
    <BasicsForm />
    <DexStatsForm />
    <ImagesForm />
    <MovesForm />
    <TypeBarForm />
    <CardInfoForm />
    <CardDownloader />
    <ImportExport />
  </Form>
);

export default CardOptionsForm;
