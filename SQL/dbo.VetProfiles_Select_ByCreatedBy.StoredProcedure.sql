USE [MiVet]
GO
/****** Object:  StoredProcedure [dbo].[VetProfiles_Select_ByCreatedBy]    Script Date: 10/13/2022 11:34:00 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Camden Rhee
-- Create date: 9/21/2022
-- Description: Select By Created By proc for Vet Profiles
-- Code Reviewer: Min Jae Kang

-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer:
-- Note:
-- =============================================

CREATE proc [dbo].[VetProfiles_Select_ByCreatedBy]
	 @PageIndex int
	,@PageSize int
	,@Id int
as

/*
	
	Declare				 @pageIndex int = 0
						,@pageSize int = 10
						,@Id int = 35

	Execute [dbo].[VetProfiles_Select_ByCreatedBy]
						 @pageIndex
						,@pageSize 
						,@Id

*/

Begin

	Declare @offset int = @PageIndex * @PageSize

	SELECT vp.[Id],
			  [Services] = (
					         Select s.Id as serviceId,
							 	    s.Name as serviceName
							 From dbo.Services as s inner join dbo.VetServices as vs
							 on s.Id = vs.ServiceId
							 where vs.VetProfileId = vp.Id
							 for JSON AUTO
					       )
		  ,vp.[Bio]
		  ,vp.[Phone]
		  ,vp.[BusinessEmail]
		  ,vp.ScheduleId
		  ,[Schedule] = (
						  Select sa.Id as scheduleAvailabilityId,
								 sa.DayOfWeek,
								 sa.StartTime,
								 sa.EndTime
						  From dbo.ScheduleAvailability as sa inner join dbo.Schedules as sc
						  on sa.ScheduleId = sc.Id 
						  where sc.Id = vp.ScheduleId
						  for JSON AUTO
						  )
		,vp.[DateCreated]
		,vp.[DateModified]
		,u.[Id] as UserId
		,u.[FirstName] as FirstName
		,u.[LastName] as LastName
		,u.[AvatarUrl] as UserImage
		,l.Id as LocationId
		,lt.Id as LocationTypeId
		,lt.Name as LocationTypeName
		,l.LineOne
		,l.LineTwo
		,l.City
		,l.Zip
		,st.Id as StateId
		,st.Name as StateName
		,l.Latitude
		,l.Longitude
		,l.DateCreated
		,l.DateModified
		,l.CreatedBy
		,l.ModifiedBy as LocationModifiedBy
		,vp.[ModifiedBy]
		,vp.[IsActive]	
		,vp.[EmergencyLine]
		  ,TotalCount = COUNT(1) OVER()
	  FROM [dbo].[VetProfiles] as vp
	  inner join dbo.Users as u
	  on vp.CreatedBy = u.Id
	  inner join dbo.Practices as pr
	  on pr.CreatedBy = u.Id
	  inner join dbo.Locations as l
	  on l.Id = pr.LocationId
	  inner join dbo.LocationTypes as lt
	  on l.LocationTypeId = lt.Id
	  inner join dbo.States as st
	  on st.Id = l.StateId
	  Where u.Id = @Id
	  ORDER BY u.Id

	  OFFSET @offset Rows
	  Fetch Next @PageSize Rows ONLY

End


GO
