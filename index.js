const core = require('@actions/core');
const { execSync } = require('child_process');


(async () => {
    try {
        const path = core.getInput('path')
        const gitPoint = core.getInput('git-point')

        console.log(`Path for verification: ${path}`)
        console.log(`Git point for verification: ${gitPoint}`)
        const paths = getChangedPaths(gitPoint)
        console.log(paths)

        const pathChanged = paths.some(element => element.startsWith(path))
        console.log(`Path changed: ${pathChanged}`)
        core.setOutput("path-changed", pathChanged)
    } catch (error) {
        core.setFailed(error.message)
    }
})()

function getChangedPaths(gitPoint) {
    try {

        let latestPoint = gitPoint
        console.log(`Provided tag: ${latestPoint}`)
        
        if (!latestPoint) {
            latestPoint = execSync('git tag --list --sort=-version:refname "v*" --merged | head -n 1').toString().trim()
            console.log(`Latest tag: ${latestPoint}`)
        }
        
        if (!latestPoint) {
            let latestPoint = execSync('git tag --list --sort=-version:refname "v*" --merged | head -n 1').toString().trim()
            atestPoint = execSync('git rev-list --max-parents=0 HEAD').toString().trim()
            console.log(`Getting changed paths since the commit: ${latestPoint}`)
        }
        
        return execSync(`git diff --name-only ${latestPoint}`).toString().trim().split(/\r?\n/)
    } catch(e) {
        console.error(e)
    }
}