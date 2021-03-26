// // import { Injectable } from '@angular/core';
// // import { Actions, createEffect } from '@ngrx/effects';



// // @Injectable()
// // export class UserEffects {



// //   constructor(private actions$: Actions) {}

// // }

// import { Injectable } from "@angular/core";
// import { Actions, createEffect, ofType } from "@ngrx/effects";
// import { of } from "rxjs";
// import { map, switchMap, catchError } from "rxjs/operators";

// // import { fromEntityActions } from "./actions";
// import * as UserActions from '../action/action.actions';
// import { EntityService } from "../entity/sevices/entity.service";
// import { undo } from "ngrx-undo";

// @Injectable()
// export class UserEffects {
//   loadEntities$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(fromUserActions.loadEntities),
//       switchMap(() =>
//         this.entityService.getEntities().pipe(
//           map((res: any) => {
//             return fromEntityActions.loadEntitiesSuccess({
//               data: res.data
//             });
//           }),
//           catchError(error => {
//             return of(
//               fromEntityActions.loadEntitiesFail({
//                 error
//               })
//             );
//           })
//         )
//       )
//     )
//   );

//   loadEntity$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(fromEntityActions.loadEntity),
//       switchMap(({ id }) =>
//         this.entityService.getEntity(id).pipe(
//           map((res: any) => {
//             return fromEntityActions.loadEntitySuccess({
//               entity: res.data
//             });
//           }),
//           catchError(error => {
//             return of(
//               fromEntityActions.loadEntityFail({
//                 error
//               })
//             );
//           })
//         )
//       )
//     )
//   );

//   updateEntity$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(fromEntityActions.updateEntity),
//       switchMap(action =>
//         this.entityService.updateEntity(action.update.id, action.update).pipe(
//           map((res: any) => {
//             return fromEntityActions.updateEntitySuccess({
//               entity: res.data
//             });
//           }),
//           catchError(error => {
//             return of(
//               fromEntityActions.updateEntityFail({
//                 error
//               }),
//               undo(action)
//             );
//           })
//         )
//       )
//     )
//   );

//   constructor(
//     private actions$: Actions,
//     private entityService: EntityService
//   ) {}
// }