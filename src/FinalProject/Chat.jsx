import React, {useEffect, useRef} from 'react';
import io from 'socket.io-client';
const Chat = ({currentUser}) => {
    const [messages, setMessages] = React.useState([]);
    const [newMessage, setNewMessage] = React.useState('');
    const [onlineUsers, setOnlineUsers] = React.useState([]);
    const socketRef = useRef(null);
    const messagesEndRef = useRef(null);
    useEffect(() => {
        socketRef.current = io("http://localhost:2500");
        if (currentUser) {
            socketRef.current.emit('join', currentUser.username);
        }
        socketRef.current.on('message', (messageData) => {
            setMessages(prev=> [...prev, messageData]);
        })
        socketRef.current.on('onlineUsers', (users) => {
            setOnlineUsers(users);
        })
        socketRef.current.on('userJoined', (data) => {
            setMessages(prev=> [...prev, {
                type:'system',
                text: `${data.username} joined chat`,
                timestamp: new Date()
            }])
        })
        socketRef.current.on('userLeft', (data) => {
            setMessages(prev=> [...prev, {
                type:'system',
                text: `${data.username} left chat`,
                timestamp: new Date()
            }])
        })
        return () => {
            socketRef.current.disconnect();
        }
    }, [currentUser])

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [messages])

    const sendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !currentUser) return;
        const messageData = {
            username: currentUser.username,
            text: newMessage.trim(),
            timestamp: new Date()
        }
        socketRef.current.emit('sendMessage', messageData);
        setNewMessage('')
    }
    const formatTime = (time) => {
        return new Date(time).toLocaleString([],{
            hour: '2-digit',
            minute: '2-digit',
        });
    }
    if (!currentUser) {
        return (
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <h2>Please login to join the chat</h2>
            </div>
        )
    }

    return (
        <div style={{
            display: 'flex',
            height: '80vh',
            maxWidth: '1000px',
            margin: '0 auto',
            padding: '20px',
            gap: '20px'
        }}>
            <div style={{
                flex: 3,
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid #ddd',
                borderRadius: '8px',
                overflow: 'hidden'
            }}>
                <div style={{
                    backgroundColor: '#007bff',
                    color: 'white',
                    padding: '15px',
                    textAlign: 'center'
                }}>
                    <h3 style={{ margin: 0 }}>Global Chat</h3>
                </div>
                <div style={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: '10px',
                    backgroundColor: '#f8f9fa'
                }}>
                    {messages.length === 0 ? (
                        <div style={{
                            textAlign: 'center',
                            color: '#666',
                            marginTop: '50px'
                        }}>
                            No messages yet. Start the conversation
                        </div>
                    ) : (
                        messages.map((msg, index) => (
                            <div key={index} style={{
                                marginBottom: '10px',
                                padding: msg.type === 'system' ? '5px' : '10px',
                                backgroundColor: msg.type === 'system' ? 'transparent' : 'white',
                                borderRadius: '5px',
                                textAlign: msg.type === 'system' ? 'center' : 'left',
                                fontStyle: msg.type === 'system' ? 'italic' : 'normal',
                                color: msg.type === 'system' ? '#666' : 'black',
                                border: msg.type === 'system' ? 'none' : '1px solid #eee'
                            }}>
                                {msg.type !== 'system' && (
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        marginBottom: '5px'
                                    }}>
                                        <strong style={{
                                            color: msg.username === currentUser.username ? '#007bff' : '#333'
                                        }}>
                                            {msg.username === currentUser.username ? 'You' : msg.username}
                                        </strong>
                                        <small style={{ color: '#666' }}>
                                            {formatTime(msg.timestamp)}
                                        </small>
                                    </div>
                                )}
                                <div>{msg.text}</div>
                            </div>
                        ))
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <form onSubmit={sendMessage} style={{
                    display: 'flex',
                    padding: '15px',
                    backgroundColor: 'white',
                    borderTop: '1px solid #ddd'
                }}>
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        style={{
                            flex: 1,
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '5px 0 0 5px',
                            fontSize: '14px'
                        }}
                        maxLength={500}
                    />
                    <button
                        type="submit"
                        disabled={!newMessage.trim()}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: newMessage.trim() ? '#007bff' : '#ccc',
                            color: 'white',
                            border: 'none',
                            borderRadius: '0 5px 5px 0',
                            cursor: newMessage.trim() ? 'pointer' : 'not-allowed'
                        }}
                    >
                        Send
                    </button>
                </form>
            </div>
            <div style={{
                flex: 1,
                border: '1px solid #ddd',
                borderRadius: '8px',
                overflow: 'hidden'
            }}>
                <div style={{
                    backgroundColor: '#28a745',
                    color: 'white',
                    padding: '15px',
                    textAlign: 'center'
                }}>
                    <h4 style={{ margin: 0 }}>Online ({onlineUsers.length})</h4>
                </div>
                <div style={{
                    padding: '10px',
                    maxHeight: '500px',
                    overflowY: 'auto'
                }}>
                    {onlineUsers.length === 0 ? (
                        <div style={{ color: '#666', textAlign: 'center' }}>
                            No users online
                        </div>
                    ) : (
                        onlineUsers.map((username, index) => (
                            <div key={index} style={{
                                padding: '8px',
                                margin: '5px 0',
                                backgroundColor: username === currentUser.username ? '#e3f2fd' : '#f8f9fa',
                                borderRadius: '5px',
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                <div style={{
                                    width: '8px',
                                    height: '8px',
                                    backgroundColor: '#28a745',
                                    borderRadius: '50%',
                                    marginRight: '8px'
                                }}></div>
                                {username === currentUser.username ? 'You' : username}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Chat;