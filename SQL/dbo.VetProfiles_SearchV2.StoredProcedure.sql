USE [MiVet]
GO
/****** Object:  StoredProcedure [dbo].[VetProfiles_SearchV2]    Script Date: 10/13/2022 11:34:00 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Camden Rhee
-- Create date: 9/22/2022
-- Description: Paginated Search proc for Vet Profiles
-- Code Reviewer: Min Jae Kang

-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer:
-- Note:
-- =============================================

CREATE proc [dbo].[VetProfiles_SearchV2]
	 @PageIndex int
	,@PageSize int
	,@query nvarchar(100)
as

/*

	Declare @pageIndex int = 0,
	        @pageSize int = 10,
			@Query nvarchar(100) = 'Connor'

	Execute [dbo].[VetProfiles_Search]
				@pageIndex
			   ,@pageSize 
			   ,@Query

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
	  Where (u.FirstName LIKE '%' + @Query + '%')
	  ORDER BY vp.Id

	  OFFSET @offset Rows
	  Fetch Next @PageSize Rows ONLY

End


GO
