import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import GenericButton from '../button/button';

const Container = styled.div`
  background-color: #0074d9;
  color: #efefef;
  min-height: 56px;
  margin: 8px;
  box-shadow: '2px 4px 10px 0px rgba(0, 0, 0, 0.2)';
  display: flex;
  align-items: center;
  text-align: left;
  padding: 4px;
  flex-wrap: wrap;
`;

const SubscribedTopic = ({ topic }) => {
  const [topicState, setTopic] = useState(null);
  useEffect(() => {
    axios.get(`/v1/topic/getById/${topic.topic_id}/`).then(response => setTopic(response.data));
  }, [topic]);
  if (topicState === null) {
    return <></>;
  }
  console.log(topicState);
  return (
    <Container>
      <div style={{ marginLeft: '10px', flexGrow: 2 }}>
        Topic: {topicState.topic.topic}
        <br />
        Subject: {topicState.subject.subject}
      </div>
      <div style={{ marginLeft: '10px' }} />
      <a href={`/resources?subjectId=${topicState.subject.id}&topicId=${topicState.topic.id}`}>
        <GenericButton borderColor="#e65100" backgroundColor="#ff9800">
          <FontAwesomeIcon color="#efefef" icon="link" />
          <div>View Resources</div>
        </GenericButton>
      </a>
    </Container>
  );
};

SubscribedTopic.propTypes = {
  topic: PropTypes.shape({}).isRequired
};

export default SubscribedTopic;
