USE [MiVet]
GO
/****** Object:  StoredProcedure [dbo].[VetProfiles_Search_JustServiceTypeId]    Script Date: 10/22/2022 3:32:26 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE proc [dbo].[VetProfiles_Search_JustServiceTypeId]
	 @PageIndex int
	,@PageSize int
	,@categoryId int
as

/*

	Declare @pageIndex int = 0,
	        @pageSize int = 10,
			@categoryId int = 9

	Execute [dbo].[VetProfiles_Search_JustServiceTypeId]
				@pageIndex
			   ,@pageSize 
			   ,@categoryId

*/

Begin

	Declare @offset int = @PageIndex * @PageSize

	SELECT distinct vp.[Id]
			 ,[Services] = (
					         Select  s.Id as serviceId
							 	    ,s.Name as serviceName
									,s.ServiceTypeId
							 From dbo.Services as s inner join dbo.VetServices as vs
							 on s.Id = vs.ServiceId
							 where vs.VetProfileId = vp.Id 
							 for JSON AUTO
					       )
		  ,sty.Id as ServiceTypeId 
		  ,sty.Name as serviceTypeName
		  ,vp.[Bio]
		  ,vp.[Phone]
		  ,vp.[BusinessEmail]
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
	  inner join dbo.VetServices as vs
	  on vs.VetProfileId = vp.Id
	  inner join dbo.Services as s
	  on s.Id = vs.ServiceId
	  inner join dbo.ServiceTypes as sty
	  on sty.Id = s.serviceTypeId
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
	  Where sty.Id = @categoryId
	  ORDER BY vp.Id

	  OFFSET @offset Rows
	  Fetch Next @PageSize Rows ONLY

End
GO
