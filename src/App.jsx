import {
  Flex,
  Layout,
  Menu,
  theme,
  Typography,
  Input,
  Card,
  List,
  Divider,
  Tag,
  Button,
  Modal,
} from 'antd';

import { useState } from 'react';
import { subjects } from './data/subjects';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;
const { Search } = Input;

const App = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [role, setRole] = useState('');
  const [showSubjects, setShowSubjects] = useState(false);
  const [output, setOutput] = useState(['Please enter your name.']);
  const [inputValue, setInputValue] = useState('');
  const [nextIndex, setNextIndex] = useState(0);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [openModel, setOpenModel] = useState(false);

  const welcome = (value) => {
    setNextIndex(1);
    return `Hello  ${value}. Welcome to Edushare, are you a student or a teacher?`;
  };

  const areYouContentCreator = (value) => {
    switch (value.toLowerCase()) {
      case 'student':
        setNextIndex(2);
        setRole('student');
        return 'Hello Student. What is your favourite subject?';
      case 'teacher':
        setNextIndex(2);
        setRole('teacher');
        return 'Hello Teacher. What subject do you wish to teach?';
      default:
        return 'I do not recognise your input, please use student or teacher';
    }
  };

  const whatSubjectAreYouInterestedIn = (value) => {
    setNextIndex(3);
    switch (role) {
      case 'student':
        setShowSubjects(true);
        return `Excellent choice! I like ${value} as well. Now can you please select the 3 subjects you are most interested in.`;
      case 'teacher':
        return `Excellent choice! I like ${value} as well. You can now continue onto the home page as your setup is complete.`;
      default:
        break;
    }
  };

  const subjectOptions = () => {
    setNextIndex(4);
    return 'subject stuff';
  };

  const listOfFn = [
    welcome,
    areYouContentCreator,
    whatSubjectAreYouInterestedIn,
    subjectOptions,
  ];

  const handleSubmission = (value) => {
    const chatFn = listOfFn[nextIndex];
    const question = chatFn(value);
    setOutput((prev) => [...prev, value]);

    setOutput((prev) => [...prev, question]);
    setInputValue('');
  };

  const handleSelectSubject = (item) => {
    if (selectedSubjects.length < 3) {
      setSelectedSubjects((prev) => [...new Set([...prev, item])]);
    }
  };

  const handleClose = (removedTag) => {
    const newTags = selectedSubjects.filter((tag) => tag !== removedTag);
    setSelectedSubjects(newTags);
  };

  return (
    <Layout className='layout' style={{ height: '100dvh' }}>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Title style={{ color: 'white', paddingRight: '1rem', margin: 0 }}>
          Edushare
        </Title>
        <div className='demo-logo' />
        <Menu
          theme='dark'
          mode='horizontal'
          defaultSelectedKeys={['2']}
          items={new Array(6).fill(null).map((_, index) => {
            const key = index + 1;
            return {
              key,
              label: `nav ${key}`,
            };
          })}
        />
      </Header>
      <Content
        style={{
          display: 'flex',
          padding: '0px',
        }}
      >
        <div
          className='site-layout-content'
          style={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            background: colorBgContainer,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Title>Getting Started...</Title>
          <Flex vertical className='chat-box'>
            <ul className='text-entry'>
              {output.map((entry, index) => {
                return (
                  <li key={index} className='chat-box-item'>
                    {entry}
                  </li>
                );
              })}
            </ul>
            {showSubjects && (
              <div className='list-container'>
                <List
                  style={{ display: 'flex' }}
                  grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 2,
                    lg: 2,
                    xl: 2,
                    xxl: 2,
                  }}
                  dataSource={subjects}
                  renderItem={(item, index) => (
                    <List.Item key={index} className='list-item'>
                      <Card
                        style={{ height: '450px', fontSize: '1rem' }}
                        hoverable
                        cover={
                          <img
                            alt={item.name}
                            style={{ borderRadius: 0, height: '200px' }}
                            src={`/assets/${item.image_name}`}
                          />
                        }
                        title={
                          <Title level={2} style={{ paddingTop: '1rem' }}>
                            {item.name}
                          </Title>
                        }
                        onClick={() => {
                          handleSelectSubject(item);
                        }}
                      >
                        <span style={{ fontWeight: 500, fontSize: '1.5rem' }}>
                          {item.level}
                        </span>
                        <Divider style={{ margin: '8px' }} />
                        {item.description}
                      </Card>
                    </List.Item>
                  )}
                />
              </div>
            )}

            {selectedSubjects.length > 0 && (
              <>
                <span
                  style={{ fontSize: '2rem', textAlign: 'end' }}
                >{`${selectedSubjects.length} out of 3`}</span>
                <div>
                  {selectedSubjects.map((subject) => {
                    return (
                      <Tag
                        key={subject}
                        style={{
                          userSelect: 'none',
                          width: 'fit-content',
                          padding: '0.5rem',
                          fontSize: '1rem',
                          marginTop: '2rem',
                          cursor: 'pointer',
                        }}
                        onClick={() => handleClose(subject)}
                      >
                        {`${subject.name} (${subject.level})`}
                      </Tag>
                    );
                  })}
                </div>
              </>
            )}
            {selectedSubjects.length === 3 && (
              <Flex
                gap={'1rem'}
                style={{
                  alignItems: 'center',
                  justifyContent: 'start',
                  paddingTop: '1rem',
                }}
              >
                <span
                  style={{
                    fontSize: '1rem',

                    textAlign: 'center',
                  }}
                >
                  Are you happy with your choices?
                </span>

                <Button
                  type='default'
                  onClick={() => {
                    setSelectedSubjects([]);
                  }}
                >
                  {' '}
                  No{' '}
                </Button>
                <Button
                  type='primary'
                  onClick={() => {
                    setOpenModel(true);
                  }}
                >
                  {' '}
                  Yes{' '}
                </Button>
              </Flex>
            )}
            <Search
              placeholder='input your response here'
              loading={false}
              value={inputValue}
              enterButton='Enter'
              onPressEnter={(value) => handleSubmission(value.target.value)}
              onChange={(e) => setInputValue(e.target.value)}
              style={{ paddingTop: '2rem' }}
            />
          </Flex>
        </div>
        {openModel && (
          <Modal
            title='You are almost Done...'
            style={{
              top: 20,
              fontSize: '1rem',
            }}
            open={openModel}
            onOk={() => {
              setOpenModel(false);
              window.location.reload();
            }}
            onCancel={() => {
              setSelectedSubjects([]);
              setOpenModel(false);
            }}
          >
            <p style={{ fontSize: '1rem' }}>
              Check the summary below and press OK to set your homepage.
            </p>
            {selectedSubjects.map((item) => {
              return (
                <p
                  key={item}
                  style={{ fontSize: '1rem', paddingTop: '0.5rem' }}
                >
                  {item.name} {item.level}
                </p>
              );
            })}
          </Modal>
        )}
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Ant Design ©2023 Created by Ant UED
      </Footer>
    </Layout>
  );
};
export default App;
