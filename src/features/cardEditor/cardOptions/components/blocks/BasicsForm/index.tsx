import AccordionForm from '@components/AccordionForm';
import { FC } from 'react';
import BadgeIconSelector from '../CardInfoForm/fields/BadgeIconSelector';
import DescriptionInput from './fields/DescriptionInput';
import HitpointsInput from './fields/HitpointsInput';
import NameInput from './fields/NameInput';
import PrevolveImgSrcFileUploader from './fields/PrevolveImgSrcFileUploader';
import PrevolveNameInput from './fields/PrevolveNameInput';
import SubnameInput from './fields/SubnameInput';
import TypeImgAmountSelector from './fields/TypeImgAmountSelector';
import TypeImgSelector from './fields/TypeImgSelector';

const BasicsForm: FC = () => (
  <AccordionForm slug="basicsForm" header="Basics">
    <NameInput />
    <SubnameInput />
    <HitpointsInput />
    <DescriptionInput />
    <PrevolveNameInput />
    <PrevolveImgSrcFileUploader />
    <TypeImgSelector />
    <TypeImgAmountSelector />
    <BadgeIconSelector />
  </AccordionForm>
);

export default BasicsForm;
