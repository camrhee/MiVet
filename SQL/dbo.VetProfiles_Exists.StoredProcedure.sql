USE [MiVet]
GO
/****** Object:  StoredProcedure [dbo].[VetProfiles_Exists]    Script Date: 10/14/2022 10:27:15 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[VetProfiles_Exists]
			@UserId int

AS 

/*
Declare @UserId int = 60
EXECUTE [dbo].[VetProfiles_Exists]
			@UserId
*/

BEGIN

	DECLARE 
		@False BIT = 0
		,@True BIT = 1
		,@vetRoleId INT = 2

	SELECT CASE WHEN EXISTS (
							SELECT 1
							FROM dbo.[Users] AS u INNER JOIN dbo.UserRoles AS ur
								on u.Id = ur.UserId
							WHERE u.Id = @UserId AND 
								  ur.RoleId = @vetRoleId AND
								  NOT EXISTS (SELECT 1
												FROM dbo.[VetProfiles]
												WHERE CreatedBy = @UserId) 
							)
	THEN @False
	ELSE @True END

END
GO
