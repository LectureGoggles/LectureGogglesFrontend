import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import UploadFAB from '../../components/FAB/UploadFAB';
import LectureGogglesLogo from '../../components/logo/logo';
import GenericButton from '../../components/button/button';
import GridBody from '../../components/gridBody';
import AuthContext from '../../contexts/AuthContext';
import useWindowWidth from '../../hooks/useWindowWidth';
import SubscribedSubject from '../../components/subscribedSubject/subscribedSubject';
import SubscribedTopic from '../../components/subscribedTopic/subscribedTopic';
import ReportCard from '../../components/reportCard/reportCard';
import { colors } from '../../components/__styles__/styles';

const LogoStyle = styled.div`
  grid-column: 2;
  grid-row: 2;
  justify-self: center;
  align-self: center;
  text-align: center;
`;

const WelcomeStyle = styled.div`
  grid-row: 3;
  grid-column: 2;
  color: #0d47a1;
  text-align: center;
`;

const SignInButtonStyle = styled.div`
  grid-row: 4;
  grid-column: 2;
  font-size: 20px;
  @media (max-width: 700px) {
    width: 80%;
  }
  @media (min-width: 700px) {
    width: 373px;
  }

  margin-bottom: 16px;
  height: 56px;
`;

const AccountCreateButtonStyle = styled(SignInButtonStyle)`
  grid-row: 5;
`;

const urlToUse = process.env.NODE_ENV === 'development' ? '' : 'https://' + process.env.REACT_APP_API_URI;

const LandingPage = () => {
  const { signedInAs, userData } = useContext(AuthContext);
  const [isAdmin, setAdmin] = useState(undefined);
  const [reports, setReports] = useState([]);
  const [subscribedSubjectIds, setSubscribedSubjectIds] = useState([]);
  const [subscribedTopicIds, setSubscribedTopicIds] = useState([]);
  const width = useWindowWidth();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (userData.is_staff) {
      axios
        .get(`${urlToUse}/v1/report/getReports/`, { headers: { Authorization: `Bearer ${token}` } })
        .then(response => {
          setReports(response.data.reports[0]);
        });
    }
    setAdmin(userData.is_staff);
  }, [userData]);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (signedInAs !== '') {
      axios
        .get(`${urlToUse}/v1/users/getMySubjectSubscriptions/`, { headers: { Authorization: `Bearer ${token}` } })
        .then(({ data }) => setSubscribedSubjectIds(data));
      axios
        .get(`${urlToUse}/v1/users/getMyTopicSubscriptions/`, { headers: { Authorization: `Bearer ${token}` } })
        .then(response => setSubscribedTopicIds(response.data));
    }
  }, [signedInAs]);
  return (
    <GridBody data-testid="landing-page">
      <div style={{ gridColumn: 2, gridRow: 1 }} />
      <LogoStyle>
        <LectureGogglesLogo width={120} height={120} />
      </LogoStyle>
      <WelcomeStyle>
        <h1>Welcome{signedInAs !== '' && ` ${signedInAs}`}!</h1>
        {signedInAs === '' && (
          <>
            <p>
              Lecture Goggles is a free, open-source, educational resource repository to help students gain a better
              understanding of school subjects.
            </p>
          </>
        )}
      </WelcomeStyle>
      {signedInAs === '' ? (
        <>
          <SignInButtonStyle>
            <a data-testid="sign-in-button" href="/signIn">
              <GenericButton text="SIGN IN" />
            </a>
          </SignInButtonStyle>
          <AccountCreateButtonStyle>
            <a href="/newAccount">
              <GenericButton text="CREATE AN ACCOUNT" />
            </a>
          </AccountCreateButtonStyle>
        </>
      ) : (
          <div style={{ gridColumn: 2, display: 'flex', flexDirection: width > 800 ? 'row' : 'column' }}>
            <a href="/subjects">
              <GenericButton style={{ marginBottom: '6px' }} width="250px">
                <FontAwesomeIcon size="3x" fixedWidth icon="book-open" />
                <br />
                Subjects
            </GenericButton>
            </a>
            <a href="/topics">
              <GenericButton style={{ marginBottom: '6px' }} width="250px">
                <FontAwesomeIcon size="3x" fixedWidth icon="scroll" />
                <br />
                Topics
            </GenericButton>
            </a>
            <a href="/resources">
              <GenericButton style={{ marginBottom: '6px' }} width="250px">
                <FontAwesomeIcon size="3x" fixedWidth icon="link" />
                <br />
                Resources
            </GenericButton>
            </a>
          </div>
        )}
      <UploadFAB />
      {signedInAs !== '' && (
        <div
          style={{
            marginTop: '36px',
            gridColumn: 2,
            width: '100%',
            textAlign: 'center',
            border: '1px solid #e3e3e3',
            boxShadow: '4px 8px 10px 0px rgba(0, 0, 0, 0.2)',
            minHeight: '56px',
            color: colors.primaryBlue,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <h1>Subscribed Subjects</h1>
          {subscribedSubjectIds.length !== 0 &&
            subscribedSubjectIds.map(subject => <SubscribedSubject key={subject.id} subject={subject} />)}
        </div>
      )}
      {signedInAs !== '' && (
        <div
          style={{
            marginTop: '36px',
            gridColumn: 2,
            width: '100%',
            textAlign: 'center',
            border: '1px solid #e3e3e3',
            boxShadow: '4px 8px 10px 0px rgba(0, 0, 0, 0.2)',
            minHeight: '56px',
            color: colors.primaryBlue
          }}
        >
          <h1>Subscribed Topics</h1>
          {subscribedTopicIds.length !== 0 &&
            subscribedTopicIds.map(topic => <SubscribedTopic key={topic.id} topic={topic} />)}
        </div>
      )}
      {isAdmin && (
        <div
          style={{
            gridColumn: 2,
            width: '100%',
            backgroundColor: '#efefef',
            textAlign: 'left',
            minHeight: '56px'
          }}
        >
          <h1>ADMIN AREA</h1>
          <h3>Reports</h3>
          {reports.map(report => (
            <ReportCard report={report} key={report.id} />
          ))}
        </div>
      )}
    </GridBody>
  );
};

export default LandingPage;
