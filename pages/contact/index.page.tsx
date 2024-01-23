import { SEO } from '@layout';
import { Collapse, Divider, Link, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Routes from '@routes';
import { FC, useState } from 'react';
import { PaperBox } from '../styles';
import ContactItem from './components/ContactItem';

const ContactPage: FC = () => {
  const [revealEmail, setRevealEmail] = useState<boolean>(false);

  return (
    <>
      <SEO
        title="Contact"
        description="Trying to get in contact? Here's what you can do.."
      />
      <Box gap={4} display="flex" flexDirection="column">
        <PaperBox>
          <Typography variant="h2" component="h1" textAlign="center">
            Contact
          </Typography>
          <Typography>
            Trying to get in contact? Here&apos;s what you can do..
          </Typography>
          <Divider flexItem />
          <Box display="flex" flexWrap="wrap" justifyContent="center">
            <ContactItem>
              <span>💡</span>
              <Typography variant="h3">Have an idea?</Typography>
              <Typography textAlign="center">
                Check out what&apos;s already on the{' '}
                <Link href={Routes.GitHub.ProjectBoard} target="_blank">
                  project board
                </Link>{' '}
                first
              </Typography>
              <Typography>
                Have a new idea? Please post it{' '}
                <Link href={Routes.GitHub.Discussions.Ideas} target="_blank">
                  here!
                </Link>
              </Typography>
            </ContactItem>
            <ContactItem>
              <span>🙏</span>
              <Typography variant="h3">Have a question?</Typography>
              <Typography textAlign="center">
                For any questions, you can make a post{' '}
                <Link
                  href={Routes.GitHub.Discussions.Questions}
                  target="_blank"
                >
                  here
                </Link>
              </Typography>
            </ContactItem>
            <ContactItem>
              <span>🐛</span>
              <Typography variant="h3">Found a bug?</Typography>
              <Typography textAlign="center">
                Please let me know by creating an issue{' '}
                <Link href={Routes.GitHub.Issues.New} target="_blank">
                  here!
                </Link>
              </Typography>
            </ContactItem>
            <ContactItem>
              <span>💬</span>
              <Typography variant="h3">Just want to chat?</Typography>
              <Typography textAlign="center">
                Visit the{' '}
                <Link href={Routes.GitHub.Discussions.Home} target="_blank">
                  GitHub discussions page
                </Link>
              </Typography>
            </ContactItem>
          </Box>
        </PaperBox>
        <PaperBox>
          <Typography textAlign="center">
            Want to get in contact privately? Don&apos;t hesitate to send an
            email!{' '}
            <Link
              component="button"
              fontSize="inherit"
              onClick={() => setRevealEmail(prev => !prev)}
            >
              Click here to reveal my email address
            </Link>
          </Typography>
          <Collapse in={revealEmail} unmountOnExit>
            <Link href={`mailto:${Routes.EMail}`}>{Routes.EMail}</Link>
          </Collapse>
        </PaperBox>
      </Box>
    </>
  );
};

export default ContactPage;
