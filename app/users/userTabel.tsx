"use strict";
import Link from "next/link";
import React from "react";
import { sort } from "fast-sort";

interface User {
  id: number;
  name: string;
  email: string;
}
interface Props {
  sortOrder: string;
}

const UserTabel = async ({ sortOrder }: Props) => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users: User[] = await res.json();
  const sortedUser = sort(users).asc(
    sortOrder === "email" ? (user) => user.email : (user) => user.name
  );
  return (
    <div>
      <table className="table tabel-bordered">
        <thead>
          <tr>
            <td className="text-xl">
              <Link href="users?sortOrder=name">Name</Link>
            </td>
            <td className="text-xl">
              <Link href="users?sortOrder=email">Email</Link>
            </td>
          </tr>
        </thead>
        <tbody>
          {sortedUser.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTabel;
