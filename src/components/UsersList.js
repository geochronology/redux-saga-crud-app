import React from 'react'
import { Button, ListGroup, ListGroupItem } from 'reactstrap'

export default function UsersList({ users }) {
  return (
    <div>
      <ListGroup>
        {users.sort((a, b) => {
          if (a.firstName > b.firstName) return 1
          else if (a.firstName < b.firstName) return -1
          else if (a.lastName > b.firstName) return 1
          else if (a.lastName < b.lastName) return -1
          else return 0
        }).map((user) => {
          return (
            <ListGroupItem key={user.id}>
              <section style={{ display: 'flex' }}>
                <div style={{ flexGrow: 1 }}>
                  {user.firstName} {user.lastName}
                </div>
                <div>
                  <Button outline color="danger">
                    Deleet
                  </Button>
                </div>
              </section>
            </ListGroupItem>
          )
        })}
      </ListGroup>
    </div>
  )
}
