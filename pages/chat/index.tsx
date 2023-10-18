// import MessageForm from '@components/MessageForm'
// import MessagesList from '@components/MessageList'
import { NextPage } from 'next'
import { MessagesProvider } from 'utils/useMessages'
// import Layout from '../components/Layout'
import MessagesList from '@components/chat/MessageList'
import MessageForm from '@components/chat/MessageForm'
import Layout from '@components/chat/Layout'

const ChatPage: NextPage = () => {
  return (
    <MessagesProvider>
      <Layout>
        <MessagesList />
        <div className="fixed bottom-0 right-0 left-0">
          <MessageForm />
        </div>
      </Layout>
    </MessagesProvider>
  )
}

export default ChatPage
