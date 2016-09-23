import { Injectable } from "@angular/core";
import { MediumPost } from "../models/medium-post";

export const MediumPosts: MediumPost[] = [
  {id: 1, title: "1", content: "content 1"},
  {id: 2, title: "2", content: "content 2"},
  {id: 3, title: "3", content: "content 3"}
];

@Injectable()
export class MediumService {
  getPosts(): Promise<MediumPost[]> {
    return Promise.resolve(MediumPosts);
  }
}
