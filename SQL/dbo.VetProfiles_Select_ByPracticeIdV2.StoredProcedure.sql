USE [MiVet]
GO
/****** Object:  StoredProcedure [dbo].[VetProfiles_Select_ByPracticeIdV2]    Script Date: 10/22/2022 3:32:26 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[VetProfiles_Select_ByPracticeIdV2]
						 @PageIndex int
						,@PageSize int
						,@Id int
/*

execute dbo.VetProfiles_Select_ByPracticeId
						0,5,
						62
*/
as 

begin

	Select vp.[Id],
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
		  --,vp.[ScheduleId]
		  --,[Schedule] = (
				--		  Select sa.Id as scheduleAvailabilityId,
				--				 sa.DayOfWeek,
				--				 sa.StartTime,
				--				 sa.EndTime
				--		  From dbo.ScheduleAvailability as sa inner join dbo.Schedules as sc
				--		  on sa.ScheduleId = sc.Id 
				--		  where sc.Id = vp.ScheduleId
				--		  for JSON AUTO
				--		  )
		,vp.[DateCreated]
		,vp.[DateModified]
		,u.[Id] as UserId
		,u.[FirstName] as FirstName
		,u.[LastName] as LastName
		,u.[AvatarUrl] as UserImage
		,[Practices] = (
						Select pr.Id as PracticeId
							   ,pr.Name as PracticeName
							   ,pr.Phone as PracticePhone
							   ,pr.BusinessEmail as PracticeBusinessEmail
							   ,pr.SiteUrl as PracticeSiteUrl
						From dbo.Practices as pr
						inner join dbo.Users as u 
							on  pr.CreatedBy = u.Id
						where vp.CreatedBy = u.Id
						for JSON PATH
						)
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
	  inner join dbo.VetPractices as VetPractices
	  on VetPractices.VetProfileId = vp.Id
	where VetPractices.PracticeId = @Id
end

GO
