import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { IClassroom } from "@app/models/classroom.model";

@Injectable({
  providedIn: "root"
})
export class ClassroomService {
  private endpoint = "http://localhost:3000/api/classroom";

  constructor(private http: HttpClient) {}

  public getClassrooms(): Observable<IClassroom[]> {
    return this.http.get<IClassroom[]>(this.endpoint);
  }

  public addClassroom(newClassroom: IClassroom): Observable<IClassroom[]> {
    return this.http.post<IClassroom[]>(this.endpoint, newClassroom);
  }

  public getClassroomByID(id: string): Observable<IClassroom> {
    return this.http.get<IClassroom>(`${this.endpoint}/${id}`);
  }

  public updateClassroom(classroom: IClassroom): Observable<IClassroom[]> {
    return this.http.put<IClassroom[]>(
      `${this.endpoint}/${classroom.id}`,
      classroom
    );
  }

  public deleteClassroom(id: string): Observable<IClassroom[]> {
    return this.http.delete<IClassroom[]>(`${this.endpoint}/${id}`);
  }
}
